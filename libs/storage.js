const multer = require('multer');
const path = require('path');

// guardado de imagenes en el storage/img en forma local en el server
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname + '/../storage/img/'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${file.fieldname}-${uniqueSuffix}.png`)
  }
})

const upload = multer({ storage });

module.exports = upload;
