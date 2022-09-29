const { faker } = require('@faker-js/faker/locale/es_MX');
const CampaignType = require('../models/CampaignType');
const Campaign = require('../models/Campaign');
const axios = require('axios');
const addDays = require('date-fns/addDays')

// campaign with distribution
async function seedCampaignDistribution(randomSeed) {
  try {
    if (randomSeed) faker.seed(Number(randomSeed));

    // python - clean data
    const { data } = await axios.get('http://localhost:5000/api/seed')
    const distArray = data.data // [{ MPG: 18, Horsepower: 130 }]

    const countCampaignType = await CampaignType.count();

    for (const element of distArray) {

      const randomCampaignType = Math.floor(Math.random() * countCampaignType);
      const campaignType = await CampaignType.findOne().skip(randomCampaignType);
      const isPost = faker.helpers.arrayElement([true, false])
      const initDate = faker.date.between(
        '2022-01-01T00:00:00.000Z',
        '2022-06-01T00:00:00.000Z'
      )

      const newCampaign = new Campaign({
        name: faker.commerce.productName(),
        isPost,
        isVideo: !isPost,
        campaignTypeId: campaignType._id,
        initDate,
        finalDate: addDays(initDate, element.Horsepower),
        campaignState: faker.helpers.arrayElement(['on', 'paused', 'finalized']),
        promotePostLink: faker.helpers.arrayElements(
          [
            faker.internet.url(),
            faker.internet.url(),
            faker.internet.url()
          ]
        ),
        destination: faker.helpers.arrayElement([
          'Tu perfil',
          'Tu sitio web',
          'Tus mensajes Directo. (MSN de IG & FB)',
          'API o Link de WhatsApp'
        ]),
        linkAPI: faker.internet.url(),
        ubication: faker.helpers.arrayElement([
          'Carabobo', 'Lara', 'Aragua', 'Miranda',
          'Guarico', 'Distrito Capital'
        ]),
        demographicsDataSegmentation: faker.helpers.arrayElement([
          'Nivel de ingresos', 'Edad', 'Religion', 'Educacion'
        ]),
        interestSegmentation: faker.helpers.arrayElement([
          'Aficiones y Actividades', 'Comida y bebidas', 'Compras y Moda', 
          'Deportes', 'Entretenimiento', 'Familia', 'Fitness', 'Negocios', 'Tecnologia'
        ]),
        audienceAge: [
          Number(faker.finance.amount(13, 30, 0)),
          Number(faker.finance.amount(31, 65, 0))
        ],
        audienceGender: faker.helpers.arrayElement([
          'Mujeres',
          'Hombres',
          'Ambos'
        ]),
        perDayBudget: element.MPG,
        promotionDuration: element.Horsepower
      })

      await newCampaign.save();

    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  seedCampaignDistribution
}
