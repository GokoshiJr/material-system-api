const { seedUserAndEmployee } = require('./UserAndEmployee');
const { seedClient } = require('./Client');
const { seedCampaign } = require('./Campaign');
const { seedProjection } = require('./Projection');
const { seedReport } = require('./Report');
const { seedCampaignDistribution } = require('./CampaignDistribution');

async function seed(req, res) {
  try {
    const {
      seed,
      campaignDistribution,
      userEmployee,
      client,
      campaign,
      projection,
      report
    } = req.body;

    if (campaignDistribution > 0) await seedCampaignDistribution(seed)
    if (userEmployee > 0) await seedUserAndEmployee(seed, userEmployee);
    if (client > 0) await seedClient(seed, client);
    if (campaign > 0) await seedCampaign(seed, campaign);
    if (projection > 0) await seedProjection(seed, projection);
    if (report > 0) await seedReport(seed, report);

    return res.status(200).json({ state: 'Seeding successfully'});

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

module.exports = {
  seed
}
