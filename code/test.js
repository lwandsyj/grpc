const fs = require('fs')
const path = require('path')
const rpcServer = require('./lib/grpcServer')

const server = new rpcServer('localhost',5005);
server.addService('./protos',path.join(__dirname,'./handle'))