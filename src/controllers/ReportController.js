const Report = require('../models/Report');
const nodemailer = require('nodemailer');

async function mailer(from, to, subject, text, html) {
  try {
    let testAccount = await nodemailer.createTestAccount();

    const auth = {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    }

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth
    });

    // send mail with defined transport object
    let mail = await transporter.sendMail({
      from, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html // html body
    });

    // console.log("Message sent: %s", mail.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(mail));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    return {
      id: mail.messageId,
      url: nodemailer.getTestMessageUrl(mail)
    }

  } catch (err) {
    console.log(err)
    return { err }
  }
}

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
      balance,
      campaignId,
      commission,
      deposits,
      percentageCommission,
      promotedPostLink,
      totalInvoiced,
      check,
    } = req.body;

    const report = new Report({
      balance,
      campaignId,
      commission,
      deposits: deposits.map(el => el.value),
      percentageCommission,
      promotedPostLink,
      totalInvoiced
    });

    const newReport = await report.save();

    const html = `
      <h2>Campaña</h2>
        ID: ${campaignId}
      <h2>Links de promoción</h2>
      <ul>
        ${promotedPostLink.map(el => `<li>${el}$</li>`)}
      </ul>
      <h2>Inversión total</h2>
        ${totalInvoiced}$
      <h2>Balance Actual</h2>
        ${balance}$
      <h2>Coste de la campaña</h2>
        ${check}$
      <h2>Porcentaje de la comisión</h2>
        ${percentageCommission}%
      <h2>Comisión</h2>
       ${commission}
      <h2>Depositos realizados</h2>
      <ul>
        ${deposits.map(el => `<li>${el.value}$ ID: ${el._id.slice(18, 24)}</li>`)}
      </ul>
      </br>
      <b>Reporte: ${newReport._id}</b>
      </br>
      </br>
      González y González - Iventium (2022)
    `
    // email
    const { id, url } = await mailer(
      '"Julio González 👻" <julio@example.com>', // sender address
      "marcel@example.com, alex@example.com", // list of receivers
      `Reporte de la campaña ${campaignId}`, // Subject line
      "Reporte", // plain text body
      html, // html body
    )
    console.log("Message sent: %s", id);
    console.log("Preview URL: %s", url);

    res.json({ status: "Report created", url, id });
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
