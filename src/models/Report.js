const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReportSchema = new Schema({
  deposits: [{
    type: Number
  }],
  promotedLink: [{
    type: String
  }],
  total_invoiced: {
    type: Number
  },
  balance: {
    type: Number
  },
  percentageCommission: {
    type: Number
  },
  invoiced : {
    type: Number
  },
  commission: {
    type: Number
  },
  investBalance: {
    type: Number
  },
  campaignId: {
    ref: "Campaign",
    type: Schema.Types.ObjectId
  },
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Report', ReportSchema);
