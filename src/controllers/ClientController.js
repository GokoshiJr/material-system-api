const Client = require('../models/Client');
const Campaign = require('../models/Campaign');
const Projection = require('../models/Projection');
const mongoose = require('mongoose')

async function campaignTimeline(clientId) {
  const query = await Projection.aggregate([
    { "$match": { "clientId": mongoose.Types.ObjectId(clientId) } },
    // join - campañas
    { "$lookup":
      {
        "from": "campaigns",
        "localField": "campaignId",
        "foreignField": "_id",
        "as":"campaign"
      }
    },
    { "$unwind": "$campaign" },
    { "$sort": { "campaign.initDate": -1} }
  ])
  return query
}

async function groupStadisticQuery(clientId, query) {
  try {
    // group by - audience gender
    const group = await Projection.aggregate([
      {"$match": { "clientId": mongoose.Types.ObjectId(clientId) } },
      // join - campañas
      {"$lookup":
        {
          "from": "campaigns",
          "localField": "campaignId",
          "foreignField": "_id",
          "as":"campaign"
        }
      },
      {"$unwind": "$campaign"},
      // join - tipo de campañas
      {"$lookup":
        {
          "from": "campaign_types",
          "localField": "campaign.campaignTypeId",
          "foreignField": "_id",
          "as":"campaign.campaignType"
        }
      },
      {"$unwind": "$campaign.campaignType"},
      // agrupar por el campo que se ingrese por parametro
      {"$group":
        {
          "_id": `$campaign.${query}`,
          "count": { "$sum": 1 }
        }
      }
    ])
    return group
  } catch (err) {
    console.log(err)
  }
}

// return stadistics of the client
async function clientStadistic(req, res) {
  try {
    const clientId = req.params.id;

    // campaign timeline
    let timeline = await campaignTimeline(clientId);
    timeline = timeline.map(({ campaign }) => ({ 
      id: campaign._id,
      title: campaign.name,
      time: campaign.initDate,
      finalDate: campaign.finalDate,
      campaignState: campaign.campaignState,
      perDayBudget: campaign.perDayBudget,
      promotionDuration: campaign.promotionDuration
    }))
    timeline.sort((a, b) => a.time - b.finalDate)

    // group by - audience gender
    let audienceGender = await groupStadisticQuery(clientId, "audienceGender");
    audienceGender = audienceGender.map((el) => ({label: el._id, value: el.count}))

    let ubication = await groupStadisticQuery(clientId, "ubication");
    ubication = ubication.map((el) => ({label: el._id, value: el.count}))

    let demographicsDataSegmentation = await groupStadisticQuery(clientId, "demographicsDataSegmentation")
    demographicsDataSegmentation = demographicsDataSegmentation.map((el) => ({label: el._id, value: el.count}))
    demographicsDataSegmentation.sort((a, b) => b.value - a.value)

    let campaignState = await groupStadisticQuery(clientId, "campaignState")
    campaignState = campaignState.map((el) => ({label: el._id, value: el.count}))
    campaignState.sort((a, b) => b.value - a.value)

    let interestSegmentation = await groupStadisticQuery(clientId, "interestSegmentation")
    interestSegmentation = interestSegmentation.map((el) => ({label: el._id, value: el.count}))

    let isPost = await groupStadisticQuery(clientId, "isPost")
    let display = [
      { label: 'Video', value: isPost[0].count },
      { label: 'Post', value: isPost[1].count },
    ]

    let campaignType = await groupStadisticQuery(clientId, "campaignType")
    campaignType = campaignType.map((el) => ({label: el._id.name, description: el._id.description,value: el.count}))
    campaignType.sort((a, b) => b.value - a.value)
    
    // re roll - campaignDistribution - projections
    // console.log(await groupStadisticQuery(clientId, "destination"))

    res.json({
      timeline,
      audienceGender,
      ubication,
      demographicsDataSegmentation,
      campaignState,
      interestSegmentation,
      display,
      campaignType
    });

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// return all clients
async function index(req, res) {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// return client by id
async function show(req, res) {
  try {
    const client = await Client.findById(req.params.id);
    res.json(client);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// create client
async function store(req, res) {
  try {
    const {
      name,
      lastName,
      email,
      phoneNumber,
      userAccount,
      password,
      socialPlatform,
      associated
    } = req.body;
    const client = new Client({
      name,
      lastName,
      email,
      phoneNumber,
      userAccount,
      password: await Client.encryptPassword(password),
      socialPlatform,
      associated
    });
    await client.save();
    res.json({ status: "Client created" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// update client by id
async function update(req, res) {
  try {
    const {
      name,
      lastName,
      email,
      phoneNumber,
      userAccount,
      password,
      socialPlatform,
      associated
    } = req.body;
    const updateClient = {
      name,
      lastName,
      email,
      phoneNumber,
      userAccount,
      socialPlatform,
      associated
    };
    if (password) updateClient.password = await Client.encryptPassword(password)
    await Client.findByIdAndUpdate(req.params.id, updateClient);
    res.json({ status: "Client updated" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// delete client by id
async function destroy(req, res) {
  try {
    await Client.findByIdAndRemove(req.params.id);
    res.json({ status: "Client deleted" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

module.exports = {
  clientStadistic,
  index,
  show,
  store,
  update,
  destroy
}
