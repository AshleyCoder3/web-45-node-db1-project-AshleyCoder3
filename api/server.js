const express = require("express");
const AccountRouter = require('./accounts/accounts-router');
const morgan = require('morgan');

const server = express();

server.use(express.json());

server.use(morgan('dev'));
server.use('/api/accounts', AccountRouter);


module.exports = server;
