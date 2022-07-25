const fs = require('fs').promises;
const Client = require('../models/Client');
const path = require('path');

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
      password: await Client.encryptPassword(password),
      socialPlatform
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
      socialPlatform
    } = req.body;
    const updateClient = {
      name,
      lastName,
      email,
      phoneNumber,
      userAccount,
      socialPlatform
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
  index,
  show,
  store,
  update,
  destroy
}
