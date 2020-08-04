const rpcClient = require('./lib/grpcClient')

rpcClient.mapDir('./protos');

console.log(rpcClient.clients.Hello.create)
rpcClient.clients.Hello.create({name:'rpcClient'},(err,res)=>{
    console.log('grpclient;')
    console.log(res)
})