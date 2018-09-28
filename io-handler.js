'use strict';

module.exports = function (io) {
  io.on( 'connection', ctx => {
    console.log( 'Join event', ctx.socket.id )
    io.broadcast( 'connections', {
      numConnections: io.connections.size
    });
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
