const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReportSchema = new Schema({
  balance: {
    type: Number
  },
  campaignId: {
    ref: "Campaign",
    type: Schema.Types.ObjectId
  },
  commission: {
    type: Number
  },
  deposits: [{
    type: Number
  }],
  percentageCommission: {
    type: Number
  },
  promotedLink: [{
    type: String
  }],
  totalInvoiced: {
    type: Number
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Report', ReportSchema);
