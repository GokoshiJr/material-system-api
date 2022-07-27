const Projection = require('../models/Projection');

// return all projections
async function index(req, res) {
  try {
    const projections = await Projection.find();
    res.json(projections);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// return projection by id
async function show(req, res) {
  try {
    const projection = await Projection.findById(req.params.id);
    res.json(projection);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// create projection
async function store(req, res) {
  try {
    const {
      link,
      balances,
      campaignId,
      clientId
    } = req.body;
    const projection = new Projection({
      link,
      balances,
      campaignId,
      clientId
    });
    await projection.save();
    res.json({ status: "Projection created" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// update projection by id
async function update(req, res) {
  try {
    const {
      link,
      balances,
      campaignId,
      clientId
    } = req.body;
    const updateProjection = {
      link,
      balances,
      campaignId,
      clientId
    };
    await Projection.findByIdAndUpdate(req.params.id, updateProjection);
    res.json({ status: "Projection updated" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// delete projection by id
async function destroy(req, res) {
  try {
    await Projection.findByIdAndRemove(req.params.id);
    res.json({ status: "Projection deleted" });
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
