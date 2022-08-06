const mongoose = require('mongoose');
const { Schema } = mongoose;

/* Explicar la definición de público  */
const AudienceDefinition = new Schema({
  name: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('audience_definition', AudienceDefinition);
