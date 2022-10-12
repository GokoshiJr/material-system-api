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
    
    if (isPost.length === 1) {
      isPost = [
        { count: isPost[0].count }, 
        { count: 0 }
      ]
    }
    if (isPost.length === 0) {
      isPost = [
        { count: 0 }, 
        { count: 0 }
      ]
    }
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
    console.log(err)
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
      socialPlatform
    } = req.body;

    const client = new Client({
      name,
      lastName,
      email,
      phoneNumber,
      userAccount,
      password,
      socialPlatform
    });

    await client.save();

    res.json({ 
      status: "Cliente creado con éxito", 
      icon: "success", 
      title: "Cliente creado con éxito" 
    });
  } catch (err) {
    res.status(500).send({ 
      status: err.message, 
      icon: "error", 
      title: "Ocurrió un error al crear el cliente" 
    });
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
      socialPlatform
    } = req.body;

    const updateClient = {
      name,
      lastName,
      email,
      phoneNumber,
      userAccount,
      socialPlatform,
      password
    };

    // if (password) updateClient.password = await Client.encryptPassword(password)

    await Client.findByIdAndUpdate(req.params.id, updateClient);

    res.json({ 
      status: "Cliente actualizado con éxito", 
      icon: "success", 
      title: "Cliente actualizado con éxito" 
    });
  } catch (err) {
    res.status(500).send({ 
      status: err.message, 
      icon: "error", 
      title: "Ocurrió un error al actualizar el cliente" 
    });
  }
}

// delete client by id
async function destroy(req, res) {
  try {
    // todo delete client projections
    await Client.findByIdAndRemove(req.params.id);
    res.json({ 
      status: "Client deleted", 
      icon: "success", 
      title: "Cliente eliminado con éxito" 
    });
  } catch (err) {
    res.status(500).send({ 
      status: err.message, 
      icon: "error", 
      title: "Ocurrió un error al eliminar el cliente" 
    });
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
