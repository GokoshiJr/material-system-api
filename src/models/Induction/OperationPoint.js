const mongoose = require('mongoose');
const { Schema } = mongoose;

/* Puntos de Operacion */
const OperationPoint = new Schema({
  name: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('operation_point', OperationPoint);
