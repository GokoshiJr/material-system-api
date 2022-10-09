const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectiontSchema = new Schema({
  link: {
    type: String,
    required: true
  },
  balances: [{
    value: Number,
    date: Date
  }],
  campaignId: {
    ref: "Campaign",
    type: Schema.Types.ObjectId
  },
  clientId: {
    ref: "Client",
    type: Schema.Types.ObjectId
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Projection', ProjectiontSchema);
