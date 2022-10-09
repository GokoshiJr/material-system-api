const { faker } = require('@faker-js/faker');
const Projection = require('../models/Projection');
const Client = require('../models/Client');
const Campaign = require('../models/Campaign');

async function seedProjection(randomSeed, numFake) {
  try {
    // semilla
    if (randomSeed) faker.seed(randomSeed);
    // contadores
    const clientCount = await Client.count();
    const campaignCount = await Campaign.count();
    if (clientCount === 0) return;
    if (campaignCount === 0) return;
    let campaignIndex = 0;
    let limit = campaignCount / clientCount
    limit = Math.floor(limit) + 1 // pueden quedar algunos clientes sin campañas asignadas
    for (let i=0; i<clientCount; i++) {
      let { _id: _idClient } = await Client.findOne().skip(i);
      for (let j=0; j<limit; j++) {
        if ((campaignIndex !== campaignCount) && (campaignIndex < campaignCount)) {
          let { _id: _idCampaign,
            perDayBudget,
            promotionDuration
          } = await Campaign.findOne().skip(campaignIndex)
          const newProjection = new Projection({
            link: faker.internet.url(),
            balances: faker.helpers.arrayElements(
              [{value: Math.floor(perDayBudget * promotionDuration), date: Date.now()}]
            ),
            campaignId: _idCampaign,
            clientId: _idClient
          })
          await newProjection.save();
        }
        campaignIndex++;
      }
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  seedProjection
}
