const Campaign = require('../models/Campaign');

// return all campaigns
async function stadistics(req, res) {
  try {
    const total = await Campaign.count();
    const on = await Campaign.find({'campaignState': 'on'}).count()
    const paused = await Campaign.find({'campaignState': 'paused'}).count()
    const finalized = await Campaign.find({'campaignState': 'finalized'}).count()
    let result = {
      total,
      on,
      paused,
      finalized
    }
    res.json(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// return all campaigns
async function index(req, res) {
  try {
    const campaigns = await Campaign.find();
    res.json(campaigns);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// return campaign by id
async function show(req, res) {
  try {
    const campaign = await Campaign.findById(req.params.id);
    res.json(campaign);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// create campaign
async function store(req, res) {
  try {
    const {
      isPost,
      isVideo,
      campaignType,
      initDate,
      finalDate,
      campaignState
    } = req.body;
    const campaign = new Campaign({
      isPost,
      isVideo,
      campaignType,
      initDate: new Date(initDate),
      finalDate: new Date(finalDate),
      campaignState
    });
    await campaign.save();
    res.json({ status: "Campaign created" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// update campaign by id
async function update(req, res) {
  try {
    const {
      isPost,
      isVideo,
      campaignType,
      initDate,
      finalDate,
      campaignState
    } = req.body;
    const updateCampaign = {
      isPost,
      isVideo,
      campaignType,
      campaignState
    };
    if (initDate) updateCampaign.initDate = new Date(initDate)
    if (finalDate) updateCampaign.finalDate = new Date(finalDate)
    await Campaign.findByIdAndUpdate(req.params.id, updateCampaign);
    res.json({ status: "Campaign updated" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// delete campaign by id
async function destroy(req, res) {
  try {
    await Campaign.findByIdAndRemove(req.params.id);
    res.json({ status: "Campaign deleted" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

module.exports = {
  stadistics,
  index,
  show,
  store,
  update,
  destroy
}
