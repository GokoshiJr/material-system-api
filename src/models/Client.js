const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const ClientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: false
  },
  userAccount: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  socialPlatform: {
    type: String,
    required: true
  },
  associated: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});

ClientSchema.statics.encryptPassword = async function(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

ClientSchema.statics.comparePassword = async function(password, receivedPassword) {
  return await bcrypt.compare(password, receivedPassword);
}

module.exports = mongoose.model('Client', ClientSchema);
