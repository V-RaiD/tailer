'use strict';

module.exports = function (io, cs) {
  io.on( 'connection', ctx => {
    //for any join event the connection emits the latest quque to the specific joinee
    console.log( 'Join event', ctx.socket.id )
    ctx.socket.emit( 'bulklines', (function () {var str = ""; cs.getQueue().forEach((k)=>{str+="<br>"+k+"<br>";});return str;})());
  })

  io.on( 'disconnect', ctx => {
    console.log( 'leave event', ctx.socket.id )
    io.broadcast( 'connections', {
      numConnections: io.connections.size
    })
  })
  io.on( 'data', ( ctx, data ) => {
    console.log( 'data event', data )
    console.log( 'ctx:', ctx.event, ctx.data, ctx.socket.id )
    console.log( 'ctx.teststring:', ctx.teststring )
    ctx.socket.emit( 'response', {
      message: 'response from server'
    })
  });

}
