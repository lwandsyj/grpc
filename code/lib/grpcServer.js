/**
 * @param {string} protodir proto 文件所在的目录
 * @param {string} functionDir 方法对应实现的目录
 * @param {string} IP  服务绑定地址
 * @param {number}  port 端口号
 * 
 * 实现思路：
 * 1. package 和 service 和 proto 文件名称一致
 * 2. function 名称和package 名称一致
 * 3. function 返回的函数对象名称和proto 里面定义的一致
 * 4. proto 中只定义一个service,并且名称和proto文件名称一致
 */
const path = require('path');
const fs = require('fs')
const grpc = require('grpc');
const protoloader = require('@grpc/proto-loader')
class RpcServer {
   
   /**
    * 构造函数
    * @param {string} ip IP地址
    * @param {string} port 端口号
    */
   constructor(ip,port){
        this.ip = ip;
        this.port = port;
        this.services={};
    }

    /**
     * 添加服务
     * @param {string} protodir 
     * @param {string} functionDir 
     */
    addService(protodir,functionDir){
       try{
           fs.readdir(protodir,(err,files)=>{
               if(err){
                   throw err;
               }
               files.forEach(file=>{
                   const fileInfo = path.parse(file);
                   const serviceName = fileInfo.name;
                   const packageName = fileInfo.name;
                   const protoPath = path.join(protodir,file);
                   const definition = protoloader.loadSync(protoPath,{
                       keepCase:true,
                       enums:String,
                       longs:String,
                       defaults:true,
                       oneofs:true
                   });
                   const proto = grpc.loadPackageDefinition(definition);
                   
                   const service = proto[packageName][serviceName].service;
                   const handlePath = path.join(functionDir,fileInfo.name);
                   const handle = require(handlePath);
                   this.services[serviceName]={service,handle}
               })
               return this.run();
           })
       }catch(ex){
           throw ex;
       }
    }

    run(){
        const server =new grpc.Server();
        Object.keys(this.services).forEach(key=>{
            const item = this.services[key];
            const service = item.service;
            const handle = item.handle;
           server.addService(service,handle)
        });
        server.bind(`${this.ip}:${this.port}`,grpc.ServerCredentials.createInsecure());
        server.start();
    }
}

module.exports=RpcServer;