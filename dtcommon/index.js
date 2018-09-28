'use strict';

  let db = require('./db');

exports.init = init;

function init () {
  exports.db = db;
}
