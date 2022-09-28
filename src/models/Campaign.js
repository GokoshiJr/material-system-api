const mongoose = require('mongoose');
const { Schema } = mongoose;

const CampaignSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  isPost: {
    type: Boolean,
    required: true
  },
  isVideo: {
    type: Boolean,
    required: true
  },
  campaignTypeId: {
    type: Schema.Types.ObjectId,
    ref: "campaign_type"
  },
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
  },
  promotePostLink: {
    type: [{ type: String }]
  },
  destination: {
    type: { type: String }
  },
  linkAPI: {
    type: String
  },
  ubication: {
    type: String
  },
  demographicsDataSegmentation: {
    type: String
  },
  interestSegmentation: {
    type: String
  },  
  audienceAge: {
    type: [
      { type: Number }
    ]
  },
  audienceGender: {
    type: String
  },
  perDayBudget: {
    type: Number
  },
  promotionDuration: {
    type: Number
  },

}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Campaign', CampaignSchema);
