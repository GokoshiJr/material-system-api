const mongoose = require('mongoose');
const { Schema } = mongoose;

const CampaignTypeSchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('campaign_type', CampaignTypeSchema);
