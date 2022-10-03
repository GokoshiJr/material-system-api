const Campaign = require('../models/Campaign');
const Projection = require('../models/Projection');
const CampaignType = require('../models/CampaignType');
const Client = require('../models/Client');

// return all campaign types
async function getCampaignUnasigned(req, res) {
  try {
    // campañas asignadas en una proyeccion
    const projections = await Projection.find()
      .populate('campaignId')
      .select('-_id campaignId')
    // id de las campañas en la proyeccion
    const campaignsInProjection = projections.map((el) => String(el.campaignId._id))    

    // todas las campañas
    const aux = await Campaign.find()
    // filtramos los id
    const campaigns = aux.map((el) => String(el._id))

    // diferencia de conjuntos - campañas que no tengan una proyeccion
    let difference = campaigns.filter(x => !campaignsInProjection.includes(x))

    // campañas sin proyeccion
    const unasigned = await Campaign.find({
      '_id': { $in: difference }
    }).populate({ path: 'campaignTypeId', select: '-_id name' });

    res.json(unasigned);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// return all campaign types
async function getCampaignTypes(req, res) {
  try {
    const campaignsTypes = await CampaignType.find()
    res.json(campaignsTypes);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// return client by campaign id
async function clientCampaigns(req, res) {
  try {
    const campaigns = await Projection.find({clientId: req.params.id}, 'campaignId -_id')
    .populate({
      path: 'campaignId',
      populate: {
        path: 'campaignTypeId',
        model: 'campaign_type'
      }
    });
    const client = await Client.findById(req.params.id, 'name');
    res.json({
      campaigns: campaigns.map((el) => el.campaignId),
      clientName: client
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// return client by campaign id
async function clientInCampaign(req, res) {
  try {
    const projection = await Projection.findOne({campaignId: req.params.id})
    .populate({
      path: 'clientId',
      select: '_id name lastName'
    });
    res.json(projection);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// return all campaigns
async function stadistics(req, res) {
  try {
    const total = await Campaign.count();
    // contador - estado de las campañas
    const on = await Campaign.find({'campaignState': 'on'}).count();
    const paused = await Campaign.find({'campaignState': 'paused'}).count();
    const finalized = await Campaign.find({'campaignState': 'finalized'}).count();
    // contador - tipos de campañas
    const types = await Campaign.aggregate([
      {
        $group: {
          _id: '$campaignTypeId',
          count: { $sum: 1}
        }
      }
    ])
    let campaignTypes = [];
    for (const element of types) {
      const { name } = await CampaignType.findById(element._id).select('-_id name')
      campaignTypes.push({
        value: element.count,
        label: name 
      })
    }
    campaignTypes.sort((a, b) => a.value - b.value)
    // contador - campañas por genero
    const gender = await Campaign.aggregate([
      {
        $group: {
          _id: '$audienceGender',
          count: { $sum: 1}
        }
      }
    ])
    let genderAudience = []
    for (const element of gender) {
      genderAudience.push({
        value: element.count,
        label: element._id
      })
    }
    // edad de la audiencia target
    const age = await Campaign.find({}).select('-_id audienceAge');
    const ageAudienceTarget = age.map(el => (
      {
        x: el.audienceAge[0],
        y: el.audienceAge[1]
      }
    ))

    res.json({
      total,
      on,
      paused,
      finalized,
      campaignTypes,
      genderAudience,
      ageAudienceTarget
    });

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// return all campaigns
async function index(req, res) {
  try {
    const campaigns = await Campaign.find()
    .populate({ path: 'campaignTypeId', select: '-_id name' });
    res.json(campaigns);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// return campaign by id
async function show(req, res) {
  try {
    const campaign = await Campaign.findById(req.params.id)
    .populate({ path: 'campaignTypeId', select: '-_id name' });
    res.json(campaign);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// create campaign
async function store(req, res) {
  try {
    const {
      audienceAge,
      audienceGender,
      campaignState,
      campaignTypeId,
      demographicsDataSegmentation,
      destination,
      finalDate,
      initDate,
      interestSegmentation,
      isPost,
      isVideo,
      linkAPI,
      name,
      perDayBudget,
      promotePostLink,
      promotionDuration,
      ubication
    } = req.body;

    const campaign = new Campaign({
      audienceAge,
      audienceGender,
      campaignState,
      campaignTypeId,
      demographicsDataSegmentation,
      destination,
      finalDate,
      initDate,
      interestSegmentation,
      isPost,
      isVideo,
      linkAPI,
      name,
      perDayBudget,
      promotePostLink,
      promotionDuration,
      ubication
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
  getCampaignUnasigned,
  getCampaignTypes,
  clientCampaigns,
  clientInCampaign,
  stadistics,
  index,
  show,
  store,
  update,
  destroy
}
