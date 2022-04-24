const mongoose = require('mongoose');
const { Schema } = mongoose;

const RoleSchema = new Schema({
  name: {
    type: String,
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('Role', RoleSchema);
