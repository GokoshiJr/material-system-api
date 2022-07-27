const mongoose = require('mongoose');
const { Schema } = mongoose;

const CampaignSchema = new Schema({
  isPost: {
    type: Boolean,
    required: true
  },
  isVideo: {
    type: Boolean,
    required: true
  },
  campaignType: [
    { type: String }
  ],
  initDate: {
    type: Date,
    required: true
  },
  finalDate: {
    type: Date,
    required: true
  },
  campaignState: {
    type: String
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Campaign', CampaignSchema);
