const mongoose = require('mongoose');
const { Schema } = mongoose;

/* Explicar la importancia de la Ubicación */
const UbicationImportance = new Schema({
  name: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('ubication_importance', UbicationImportance);
