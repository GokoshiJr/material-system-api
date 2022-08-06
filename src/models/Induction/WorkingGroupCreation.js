const mongoose = require('mongoose');
const { Schema } = mongoose;

/* Creación del grupo de trabajo por WhatsApp */
const WorkingGroupCreation = new Schema({
  name: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('working_group_creation', WorkingGroupCreation);
