const fs = require('fs')
const path = require('path')
const rpcServer = require('../lib/grpcServer')

const server = new rpcServer('localhost',4000);
server.addService(path.join(__dirname,'../protos'),path.join(__dirname,'../handle'))