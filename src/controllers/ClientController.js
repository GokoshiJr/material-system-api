const Client = require('../models/Client');
const Campaign = require('../models/Campaign');
const Projection = require('../models/Projection');
const mongoose = require('mongoose')

// return stadistics of the client
async function clientStadistic(req, res) {
  try {
    // group by - audience gender
    const campaigns = await Projection.aggregate([
      {"$match": {"clientId": mongoose.Types.ObjectId(req.params.id)} },
      {"$lookup":
        {
          "from": "campaigns",
          "localField": "campaignId",
          "foreignField": "_id",
          "as":"campaign"
        }
      },
      {"$unwind": "$campaign"},
      {"$group":
        {
          "_id": "$campaign.audienceGender",
          "count": {"$sum": 1}
        }
      },
    ])
    // format to display in frontend
    const audienceGender = campaigns.map((el) => ({label: el._id, value: el.count}))

    res.json({
      audienceGender
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
