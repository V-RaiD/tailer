'use strict';

var dtcommon = require('dtcommon');
 dtcommon.init();

 var koa = require('koa');
 console.log('Initiating koa config');
 var app = module.exports = koa();
 var koaConfig = require('./koa');
 var iohandler = require('./io-handler');
 var cronscript = require('./cron-script');
 koaConfig(app);
 iohandler(app.io);
 cronscript(app);

var promiseToTrack = new Promise(function (resolve, reject) {
  dtcommon.db.connect().then(function () {
    if (!module.parent) {
      app.server = app.listen(8080);
      resolve(`tailer is tailing at : 8080`);
    } else {
      reject(`tailer crapped its heap it ain't gonna load`)
    }
  }).catch(function (error) {
    reject(`tailer lost its way : ${error}`);
  });
});

promiseToTrack.then(function (data) {
  console.log(`tail me ...`, data);
}).catch(function (error) {
  console.err(`tailer has lost his tail \n${error}`);
});
