var Queue = function (size) {
  this.queue = [];
  for (var i = 0; i < size; i++) {
    this.queue[i] = null;
  }
  this.elements = 0;
  this.start = 0;
  this.end = 0;
  this.MAX_SIZE = size;
}

Queue.prototype.add = function (data) {
  this.elements++;
  if (this.elements > this.MAX_SIZE) {
    this.dequeue(1);
  }
  this.queue[this.end%this.MAX_SIZE] = data;
  this.end++;
}

Queue.prototype.dequeue = function (factor) {
  if (factor > this.MAX_SIZE) {
    console.error("Illegal factor");
    return;
  }
  this.elements = this.elements - factor;
  this.start = (this.start + factor)%this.MAX_SIZE;
}

Queue.prototype.toArray = function () {
  var array = [];
  var j = 0;
  if ((this.end-1)%this.MAX_SIZE < this.start%this.MAX_SIZE) {
    for (var i = this.start%this.MAX_SIZE; i < this.MAX_SIZE; i++) {
      array[j++] = this.queue[i];
    }
    for (var i = 0; i <= (this.end-1)%this.MAX_SIZE; i++) {
      array[j++] = this.queue[i];
    }

    return array;
  } else {
    for (var i = this.start%this.MAX_SIZE; i <= (this.end-1)%this.MAX_SIZE; i++) {
      array[j++] = this.queue[i];
    }
  }

  return array;
}

module.exports = Queue;
