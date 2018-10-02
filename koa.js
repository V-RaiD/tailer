/**  Written By : Amitesh Rai */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
let cors = require('koa-cors'), compress = require('koa-compress'),
parse = require('koa-better-body'), IO = require('koa-socket'), co = require('co'), send = require('koa-send');
var io = new IO();
module.exports = function (app) {
    app.use(cors({
        maxAge: 3600,
        credentials: true,
        headers: 'Access-Control-Allow-Origin, Access-Control-Expose-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization',
        methods: 'GET, HEAD, OPTIONS, PUT, POST, DELETE'
    }));
    app.use(function* (next) {
        this.req.connection.setTimeout(0);
        this.req.connection.setNoDelay(true);
        yield next;
    });
    app.use(compress());
    app.use(function* () {
        yield send(this, this.path, { root: __dirname });
    });
    io.attach(app);
    io.use(co.wrap(function* (ctx, next) {
        let start = new Date();
        yield next();
        console.log(`response time: ${new Date() - start}ms`);
    }));
};
