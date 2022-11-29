
const express = require('express');
const bodyParser = require('body-parser');

const config = require("./yaml-config")("./RESTfull/service.config.yml")

const app = express();
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/product', require('./routes'));

app.listen(config.service.port, () => {
  console.log(`${config.service.name} starts on http://localhost:${config.service.port}`);
});


