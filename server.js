const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controller');
const path = require('path');

const app = express();

// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.route('/api/upload').get(controller.sendMessage).post(controller.uploadImage);

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server has started on port: ${port}`));
