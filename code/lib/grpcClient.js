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

class RpcClient {
    /**
     * 构造函数
     * @param {string} ip ip地址
     * @param {number} port 端口号
     */
    constructor(ip, port) {
        this.ip = ip;
        this.port = port;
        this.clients = {};
    }

    /**
     * 加载服务
     * @param {string} protodir proto 文件目录
     * @param {string} handleDir 执行目录
     */
    mapDir(protodir, handleDir) {
        try {
            const files = fs.readdirSync(protodir);
            files.forEach(file => {
                const item = path.parse(file);
                const packageName = item.name;
                const serviceName = item.name;
                const protoPath = path.join(protodir, file);
                // 加载proto 配置
                const deifinition = protoloader.loadSync(protoPath);
                // 获取package
                const protoPackage = grpc.loadPackageDefinition(deifinition)[packageName];
                // 实例化
                this.clients[serviceName] = new protoPackage[serviceName](`${this.ip}:${this.port}`, grpc.credentials.createInsecure());
            })
        } catch (ex) {
            throw ex;
        }
    }
}

module.exports = new RpcClient('localhost', 5005)