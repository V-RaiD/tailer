const fs = require('fs');
var lastUpTime = 0;
var lastLine = 0;
var myapp = null;
var file = "test.txt";

var checkFileChangeStatus = function  () {
  fs.stat(file,function (err, stat) {
    if (err) {
      console.error("file not readable");
    } else {
      var mTime = new Date(stat.mtime).getTime();
      if (mTime > lastUpTime) {
        fs.readFile(file, 'utf8' , function (err, data) {
          if (err){
            console.log(err);
          } else {
            var lines = data.split("\n");
            var linesString = "<br>";
            if (lines.length > 10) {
              for (let i = lines.length-10; i < lines.length; i++) {
                linesString+=lines[i]+"<br>";
              }
            } else {
              for (let i = 0; i < lines.length; i++) {
                linesString+=lines[i]+"<br>";
              }
            }
            broadcast(linesString);
            lastUpTime=mTime;
          }
        })
      }
    }
  });
}

var broadcast = function (data) {
  myapp.io.broadcast('newLine',data);
}
module.exports = function (app) {
  myapp = app;
  setInterval(checkFileChangeStatus, 100);
}
