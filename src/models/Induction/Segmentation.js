const mongoose = require('mongoose');
const { Schema } = mongoose;

/* Explicar Segmentación */
const Segmentation = new Schema({
  name: {
    type: String,
    required: true
  },
  description:{
    type: String
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('segmentation', Segmentation);
