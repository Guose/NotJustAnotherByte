const axios = require('axios')
const ogs = require('open-graph-scraper')

const SERP_API_KEY = process.env.SERP_API_KEY

exports.searchRecipes = async (req, res) => {
  const { query, chefs } = req.body

  if (!query || !chefs || !Array.isArray(chefs) || chefs.length === 0) {
    return res.status(400).json({ error: 'Missing search query or chef list' })
  }

  const chefList = chefs.join(', ')
  const searchPhrase = `${query} by ${chefList}`

  try {
    // Step 1: Call SerpAPI
    const serpRes = await axios.get('https://serpapi.com/search.json', {
      params: {
        q: searchPhrase,
        api_key: SERP_API_KEY,
        num: 10,
        engine: 'google',
      },
    })

    const organicResults = serpRes.data.organic_results ?? []
    console.log('SERP RESULTS:', organicResults.map(r => r.link))

    // Step 2: Loop through results to find a valid 200 OK page with an image
    for (const result of organicResults) {
      const url = result.link;
      console.log(`Checking URL: ${url}`);

      try {
        const headCheck = await axios.head(url)
        if (headCheck.status !== 200) continue

        // Try OpenGraph first
        const { result: og } = await ogs({ url })
        const title = og.success && og.ogTitle ? og.ogTitle : result.title ?? 'Untitled Recipe'

        const image =
          og.success && og.ogImage?.url
            ? og.ogImage.url
            : result.thumbnail ?? null // replace null with a real fallback image.

        if (url && image) {

          return res.status(200).json([
            {
              title,
              by: 'Ina Garten',
              url,
              image,
            },
          ])
        }
      } catch (err) {
        console.log(`Failed to verify or scrape: ${url}`)
        continue
      }
    }

    return res.status(404).json({ error: 'No verified recipe found.' })
  } catch (err) {
    console.error('Search Recipe Error:', err.message)
    return res.status(500).json({ error: 'Failed to search recipes' })
  }
}
