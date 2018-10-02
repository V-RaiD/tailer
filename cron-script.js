const fs = require('fs');
const readline = require('readline');

var myapp;
//a queue of messages
//it is helpfull in maintaining a constant sized tail of ile, we can even make it configurable by changing the size
var q = require('./queue.js');
var queue = new q(10);
var lineNo = 0;
var broadcastFlag = false;
var sizeDiff = false;

//watching the file for any changes
fs.watchFile('log.txt', {persistent:true, interval: 100}, (curr, prev) => {
  if (curr.size < prev.size) {//handling any reduction in data in file
    sizeDiff = true;
    broadcastFlag = false;
    lineNo=0;
    queue = new q(10);
    liner(false);
  }else if (curr.mtime > prev.mtime) {//for any increment in data in file
    liner(true);
  }
});
function broadcast (data) {
  myapp.io.broadcast('newLine',"<br>"+data+"<br>");
}

//liner handles all the re reading of file line by line
function liner (checkLine) {
  var rl = readline.createInterface({
    input: fs.createReadStream('log.txt'),
  });
  var lines = 0;
  rl.on('line', (line) => {
    if (checkLine) {
      lines++;
      if (lines > lineNo) {
        lineNo++;
        queue.add(line);
        //pushing any delta change
        if(broadcastFlag)
          broadcast(line);
      }
    } else {
      lineNo++;
      queue.add(line);
      //pushing any delta change
      if(broadcastFlag)
        broadcast(line);
    }
  });

  rl.on('close', () => {
    console.log("close");
    if (!broadcastFlag) {
      broadcastFlag = true;
      if(sizeDiff) {
        sizeDiff = false;
        myapp.io.broadcast("bulklines",(function () {var str = ""; queue.toArray().forEach((k)=>{str+="<br>"+k+"<br>";});return str;})())
      }
    }
  });
}

module.exports =  {
  init: function (app) {
    myapp = app;
    liner(false);
  },
  getQueue: function () {
    return queue.toArray();
  }
}
