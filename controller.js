const upload = require('./multerConfig');

exports.sendMessage = (req, res) =>
	res.status(200).json({
		status: 'success',
		message: 'You are using the Image upload API, make a POST request to upload Image'
	});

exports.uploadImage = (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			res.status(400).json({
				status: 'fail',
				message: err
			});
		} else {
			res.status(200).json({
				status: 'success',
				file: req.file
			});
		}
	});
};
