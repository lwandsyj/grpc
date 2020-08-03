const grpc = require('grpc')

const protoLoader = require('@grpc/proto-loader');

const path = require('path')

// proto 路径
const protoPath = path.join(__dirname,'./test.proto')

// 加载proto
const definition = protoLoader.loadSync(protoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });

// 获取包名
const grpcObject = grpc.loadPackageDefinition(definition);

console.dir(grpcObject)
// package 包名对象
/*
{
  Request: {
    format: 'Protocol Buffer 3 DescriptorProto',
    type: {
      field: [Array],
      nestedType: [],
      enumType: [],
      extensionRange: [],
      extension: [],
      oneofDecl: [],
      reservedRange: [],
      reservedName: [],
      name: 'Request',
      options: null
    },
    fileDescriptorProtos: [ [Buffer [Uint8Array]] ]
  },
  Response: {
    format: 'Protocol Buffer 3 DescriptorProto',
    type: {
      field: [Array],
      nestedType: [],
      enumType: [],
      extensionRange: [],
      extension: [],
      oneofDecl: [],
      reservedRange: [],
      reservedName: [],
      name: 'Response',
      options: null
    },
    fileDescriptorProtos: [ [Buffer [Uint8Array]] ]
  },
  HelloService: [Function: ServiceClient] {
    service: { sayHello: [Object], create: [Object] }
  },
  HelloService2: [Function: ServiceClient] { service: { create: [Object] } }
}
*/
//service 对象
/*
service: {
    sayHello: {
      path: '/test.HelloService/sayHello',
      requestStream: false,
      responseStream: false,
      requestSerialize: [Function: serialize],
      requestDeserialize: [Function: deserialize],
      responseSerialize: [Function: serialize],
      responseDeserialize: [Function: deserialize],
      originalName: 'sayHello',
      requestType: [Object],
      responseType: [Object]
    },
    create: {
      path: '/test.HelloService/create',
      requestStream: false,
      responseStream: false,
      requestSerialize: [Function: serialize],
      requestDeserialize: [Function: deserialize],
      responseSerialize: [Function: serialize],
      responseDeserialize: [Function: deserialize],
      originalName: 'create',
      requestType: [Object],
      responseType: [Object]
    }
  }
}
*/

/**
 * 方法实现
 * call: 获取客户端请求
 * call.request: 客户端请求，request对象中,只有 HelloRequest 中定义的字段
 * callback(err,success): 发送消息到客户端
 */
const sayHello= function(call,callback){
    console.log(call)
    callback(null,{name:'ssss',age:5})
}

const create= function(call,callback){
    console.log(call.request);
    // 表示没有错误
    callback(null,{name:'create'})
}
/**
    if (existingNoteIndex != -1) {
          notes.splice(existingNoteIndex, 1)
             callback(null, {})
          } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not found"
            })
      }
 */
const server = new grpc.Server();
/*
* 第一个参数是{ sayHello: [Object], create: [Object] }
 HelloService: [Function: ServiceClient] {
    service: { sayHello: [Object], create: [Object] }
  },
*****************************************************
第二个参数是方法对应的具体实现
*/
server.addService(grpcObject.test.HelloService.service,{sayHello,create})

server.bind('localhost:5000',grpc.ServerCredentials.createInsecure())

server.start()