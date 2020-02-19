const multer = require("multer");
const path = require("path");
const nanoid = require("nanoid");
const uploadPath = path.join(__dirname, "public", "uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) =>
    cb(null, nanoid() + path.extname(file.originalname))
});
const upload = multer({ storage });

module.exports = {
  upload
};
