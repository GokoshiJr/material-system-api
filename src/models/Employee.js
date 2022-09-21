const { appConfig } = require('../config');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    required: false
  },
  socialId: {
    type: String,
    unique: true,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
}, {
  timestamps: true,
  versionKey: false
});

// metodo para setear la url de la imagen guardada en el servidor
EmployeeSchema.methods.setImgUrl = function setImgUrl(filename) {
  const { host, port } = appConfig;
  this.imgUrl = `${host}:${port}/public/${filename}`
}

module.exports = mongoose.model('Employee', EmployeeSchema);
