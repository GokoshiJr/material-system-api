const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  roles: [{
    ref: "Role",
    type: Schema.Types.ObjectId
  }],
}, {
  timestamps: true,
  versionKey: false
});

UserSchema.statics.encryptPassword = async function(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

UserSchema.statics.comparePassword = async function(password, receivedPassword) {
  return await bcrypt.compare(password, receivedPassword);
}

module.exports = mongoose.model('User', UserSchema);
