const Report = require('../models/Report');

// return all reports
async function index(req, res) {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// return report by id
async function show(req, res) {
  try {
    const report = await Report.findById(req.params.id);
    res.json(report);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// create report
async function store(req, res) {
  try {
    const {
      deposits,
      promotedLink,
      total_invoiced,
      balance,
      percentageCommission,
      invoiced,
      commission,
      investBalance,
      campaignId
    } = req.body;
    const report = new Report({
      deposits,
      promotedLink,
      total_invoiced,
      balance,
      percentageCommission,
      invoiced,
      commission,
      investBalance,
      campaignId
    });
    await report.save();
    res.json({ status: "Report created" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// update report by id
async function update(req, res) {
  try {
    const {
      deposits,
      promotedLink,
      total_invoiced,
      balance,
      percentageCommission,
      invoiced,
      commission,
      investBalance,
      campaignId
    } = req.body;
    const updateReport = {
      deposits,
      promotedLink,
      total_invoiced,
      balance,
      percentageCommission,
      invoiced,
      commission,
      investBalance,
      campaignId
    };
    await Report.findByIdAndUpdate(req.params.id, updateReport);
    res.json({ status: "Report updated" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// delete report by id
async function destroy(req, res) {
  try {
    await Report.findByIdAndRemove(req.params.id);
    res.json({ status: "Report deleted" });
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
