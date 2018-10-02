'use strict';

 var koa = require('koa');
 console.log('Initiating koa config');
 var app = module.exports = koa();
 var koaConfig = require('./koa');//middleware
 var iohandler = require('./io-handler');//socket io
 var cronscript = require('./cron-script');//main file watcher and functionalities
 koaConfig(app);
 cronscript.init(app);
 iohandler(app.io, cronscript);

var promiseToTrack = new Promise(function (resolve, reject) {
    if (!module.parent) {
      app.server = app.listen(8080);
      resolve(`tailer is tailing at : 8080`);
    } else {
      reject(`tailer crapped its heap it ain't gonna load`)
    }
});

promiseToTrack.then(function (data) {
  console.log(`tail me ...`, data);
}).catch(function (error) {
  console.err(`tailer has lost his tail \n${error}`);
});
