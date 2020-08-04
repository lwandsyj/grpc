
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')

const path = require('path')

const protopath = path.join(__dirname,'./protos/Hello.proto');

const deifinition = protoLoader.loadSync(protopath);

const package = grpc.loadPackageDefinition(deifinition).Hello;

// 实力化service
const client = new package.Hello('localhost:5005',grpc.credentials.createInsecure());

/**
 * 参数如果没有传递或者参数类型不对，那么会使用默认值，
 */
client.create({name:44,age:'44x'},(err,res)=>{

    // err 是服务器对象callback的第一个参数
    // res 是具体的返回值
    console.log(res)
})
