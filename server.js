const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const controller = require('./controller');

const app = express();

// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.route('/api/upload').get(controller.sendMessage).post(controller.uploadImage);

const port = 5000;

app.listen(port, () => console.log(`server has started on port: ${port}`));
