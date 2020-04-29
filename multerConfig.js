const multer = require('multer');

// Set storage Engine
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './image-upload/public/uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, `image-${Date.now()}.${file.mimetype.split('/')[1]}`);
	}
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true);
	} else {
		cb('Uploaded file is not an Image', false);
	}
};

const upload = multer({
	storage,
	fileFilter
}).single('photo');

module.exports = upload;
