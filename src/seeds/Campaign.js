const { faker } = require('@faker-js/faker');
const CampaignType = require('../models/CampaignType');
const Campaign = require('../models/Campaign');

// campaign seed generator
async function seedCampaign(randomSeed, numFake) {
  try {
    if (randomSeed) faker.seed(randomSeed);
    const count = await CampaignType.count();
    for (let i=0; i<numFake; i++) {
      let random = Math.floor(Math.random() * count);
      let { _id } = await CampaignType.findOne().skip(random);
      const newCampaign = new Campaign({
        isPost: faker.helpers.arrayElement([true, false]),
        isVideo: faker.helpers.arrayElement([true, false]),
        campaignType: _id,
        initDate: faker.date.between('2020-01-01T00:00:00.000Z','2030-01-01T00:00:00.000Z'),
        finalDate: faker.date.between('2020-01-01T00:00:00.000Z','2030-01-01T00:00:00.000Z'),
        campaignState: faker.helpers.arrayElement(['on', 'paused', 'finalized']),
        promotePostLink: faker.helpers.arrayElements(
          [
            faker.internet.url(),
            faker.internet.url(),
            faker.internet.url()
          ]
        ),
        destination: faker.helpers.arrayElement(['Tu perfil', 'Tu sitio web', 'Tus mensajes Directo. (MSN de IG & FB)', 'API o Link de WhatsApp']),
        linkAPI: faker.internet.url(),
        ubication: faker.address.cityName(),
        demographicsDataSegmentation: faker.lorem.sentence(4),
        interestSegmentation: faker.lorem.sentence(4),
        behaviorSegmentation: faker.lorem.sentence(4),
        audienceAge: [13, 65],
        audienceGender: faker.helpers.arrayElement([
          'Mujeres', 'Hombres', 'Ambos'
        ]),
        perDayBudget: faker.random.numeric(1),
        promotionDuration: faker.random.numeric(2)

      })
      await newCampaign.save();
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  seedCampaign
}
