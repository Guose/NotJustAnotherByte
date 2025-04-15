const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Chef = require('../models/Chef')

dotenv.config()

const chefs = [
  { name: 'Gordon Ramsay', slug: 'gordon-ramsay' },
  { name: 'Ina Garten', slug: 'ina-garten' },
  { name: 'Tyler Florence', slug: 'tyler-florence' },
  { name: 'Jamie Oliver', slug: 'jamie-oliver' },
  { name: 'Guy Fieri', slug: 'guy-fieri' },
  { name: 'Alton Brown', slug: 'alton-brown' },
  { name: 'Wolfgang Puck', slug: 'wolfgang-puck' },
  { name: 'Paula Deen', slug: 'paula-deen' },
  { name: 'Anthony Bourdain', slug: 'anthony-bourdain' },
  { name: 'Julia Child', slug: 'julia-child' },
  { name: 'David Chang', slug: 'david-chang' },
  { name: 'Thomas Keller', slug: 'thomas-keller' },
  { name: 'Mario Batali', slug: 'mario-batali' },
  { name: 'Marcella Hazan', slug: 'marcella-hazan' },
  { name: 'Martha Stewart', slug: 'martha-stewart' },
  { name: 'Nigella Lawson', slug: 'nigella-lawson' },
  { name: 'Emeril Lagasse', slug: 'emeril-lagasse' },
  { name: 'Rachael Ray', slug: 'rachael-ray' },
  { name: 'Bobby Flay', slug: 'bobby-flay' },
  { name: 'Giada De Laurentiis', slug: 'giada-de-laurentiis' },
]

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    for (const chef of chefs) {
      const exists = await Chef.findOne({ slug: chef.slug })
      if (!exists) {
        await Chef.create(chef)
        console.log(`Added: ${chef.name}`)
      } else {
        console.log(`Skipped (already exists): ${chef.name}`)
      }
    }

    console.log('Chef seeding complete.')
    process.exit(0)
  } catch (err) {
    console.error('Seeding failed:', err)
    process.exit(1)
  }
}

seed()
