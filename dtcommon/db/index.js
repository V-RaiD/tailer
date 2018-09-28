'use strict';

let self = exports;
const instance = require('./instance');

self.connect = connector;

function connector () {
  return new Promise (function (resolve, reject) {
    //connect database here and point it to instance
    instance.init();
    self.instance = instance;
    resolve("Drone store ready!");
  })
}
