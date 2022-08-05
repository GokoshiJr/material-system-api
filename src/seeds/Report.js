const { faker } = require('@faker-js/faker');
const Report = require('../models/Report');
const Campaign = require('../models/Campaign');

async function seedReport(randomSeed, numFake) {
  try {
    const campaignCount = await Campaign.count();
    if (campaignCount === 0) return;

    if (randomSeed) faker.seed(randomSeed);

    for (let i=0; i<numFake; i++) {
      let randomCampaign = Math.floor(Math.random() * campaignCount);
      let { _id: _idCampaign } = await Campaign.findOne().skip(randomCampaign);

      const newReport = new Report({
        deposits: faker.helpers.arrayElements(
          [
            faker.random.numeric(2),
            faker.random.numeric(2),
            faker.random.numeric(2)
          ]
        ),
        promotedLink: faker.helpers.arrayElements(
          [
            faker.internet.url(),
            faker.internet.url(),
            faker.internet.url()
          ]
        ),
        total_invoiced: faker.random.numeric(2),
        balance: faker.random.numeric(3),
        percentageCommission: faker.random.numeric(1),
        invoiced : faker.random.numeric(2),
        commission: faker.random.numeric(2),
        investBalance: faker.random.numeric(2),
        campaignId: _idCampaign,
      })
      await newReport.save();

    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  seedReport
}
