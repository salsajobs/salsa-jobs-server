// Disable winston when running jasmine tests
const winston = require('winston');
winston.remove(winston.transports.Console);