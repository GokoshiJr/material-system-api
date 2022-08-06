const mongoose = require('mongoose');
const { Schema } = mongoose;

/* Vinculacion de cuentas */
const VinculationAccount = new Schema({
  name: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('vinculation_account', VinculationAccount);
