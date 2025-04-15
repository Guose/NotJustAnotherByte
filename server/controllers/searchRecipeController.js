const axios = require('axios')
const ogs = require('open-graph-scraper')
const Recipe = require('../models/Recipe')
const User = require('../models/User')
const Chef = require('../models/Chef')

const SERP_API_KEY = process.env.SERP_API_KEY

exports.searchRecipes = async (req, res) => {
  const { query } = req.body
  const userId = req.user?._id || req.user?.id

  if (!query || !userId) {
    return res.status(400).json({ error: 'Missing search query, chefName, or userId' })
  }

  const user = await User.findById(userId).populate('favoriteChefs.chefId')
  if (!user || !user.favoriteChefs?.length) {
    return res.status(404).json({ error: 'User or favorite chefs not found'})
  }

  const chefNames = user.favoriteChefs
    .sort((a, b) => a.order - b.order)
    .slice(0, 5)
    .map(fav => fav.chefId?.name)
  
  if (chefNames.length === 0) {
    return res.status(404).json({ error: 'No valid chefs found for user' })
  }

  const results = []

  for (const chefName of chefNames) {
    const existingRecipe = await Recipe.findOne({
      user: userId,
      query: query.toLowerCase(),
      chefName: chefName.toLowerCase(),
      isSavedSearch: true,
    })

    if (existingRecipe) {
      results.push({
        title: existingRecipe.title,
        by: existingRecipe.chefName,
        url: existingRecipe.sourceUrl,
        image: existingRecipe.image,
      })
      continue
    }
    
    // Fetch from SerpAPI
    try {
      const serpRes = await axios.get('https://serpapi.com/search.json', {
        params: {
          q: `${query} by ${chefName}`,
          api_key: SERP_API_KEY,
          num: 10,
          engine: 'google',
        },
      })

      const organicResults = serpRes.data.organic_results ?? []

      // Step 2: Loop through results to find a valid 200 OK page with an image
      for (const result of organicResults) {
        const url = result.link

        try {
          const headCheck = await axios.head(url)
          if (headCheck.status !== 200) continue

          // Try OpenGraph first
          const { result: og } = await ogs({ url })

          const title = og.success && og.ogTitle ? og.ogTitle : result.title ?? 'Untitled'

          const image = og.success && og.ogImage?.url
            ? og.ogImage.url
            : result.thumbnail ?? null // replace null with a real fallback image.
          
          const recipe = new Recipe({
            title: title,
            sourceUrl: url,
            image: image,
            author: chefName,
            user: userId,
            query: query.toLowerCase(),
            chefName: chefName.toLowerCase(),
            isSavedSearch: true,
          })

          await recipe.save()

          results.push({
            title: recipe.title,
            by: recipe.chefName,
            url: recipe.sourceUrl,
            image: recipe.image,
          })  
          
          break
        } catch {
          continue
        }
      }
    } catch {
      continue
    }
  }

  if (results.length === 0) {
    return res.status(404).json({
      error: 'No recipes found from your favorite chefs. Consider updating user preferences.',
    })
  }

  return res.status(200).json(results)
}
