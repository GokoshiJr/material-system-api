const { seedUserAndEmployee } = require('./UserAndEmployee');
const { seedClient } = require('./Client');
const { seedCampaign } = require('./Campaign');
const { seedProjection } = require('./Projection');
const { seedReport } = require('./Report');
const { seedInductionAccount } = require('./InductionAccount');

async function seed(req, res) {
  try {
    const {
      seed,
      userEmployee,
      client,
      campaign,
      projection,
      report,
      inductionAccount
    } = req.body;

    if (userEmployee > 0) await seedUserAndEmployee(seed, userEmployee);
    if (client > 0) await seedClient(seed, client);
    if (campaign > 0) await seedCampaign(seed, campaign);
    if (projection > 0) await seedProjection(seed, projection);
    if (report > 0) await seedReport(seed, report);
    if (inductionAccount > 0) await seedInductionAccount(seed, inductionAccount);

    return res.status(200).json({ state: 'Seeding successfully'});
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

module.exports = {
  seed
}
