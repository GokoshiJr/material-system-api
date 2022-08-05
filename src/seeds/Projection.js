const { faker } = require('@faker-js/faker');
const Projection = require('../models/Projection');
const Client = require('../models/Client');
const Campaign = require('../models/Campaign');

async function seedProjection(randomSeed, numFake) {
  try {
    const clientCount = await Client.count();
    const campaignCount = await Campaign.count();

    if (clientCount === 0) return;
    if (campaignCount === 0) return;

    if (randomSeed) faker.seed(randomSeed);

    for (let i=0; i<numFake; i++) {
      let randomClient = Math.floor(Math.random() * clientCount);
      let randomCampaign = Math.floor(Math.random() * campaignCount);
      let { _id: _idClient } = await Client.findOne().skip(randomClient);
      let { _id: _idCampaign } = await Campaign.findOne().skip(randomCampaign);

      const newProjection = new Projection({
        link: faker.internet.url(),
        balances: faker.helpers.arrayElements(
          [
            faker.random.numeric(2),
            faker.random.numeric(2),
            faker.random.numeric(2)
          ]
        ),
        campaignId: _idCampaign,
        clientId: _idClient
      })
      await newProjection.save();

    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  seedProjection
}
