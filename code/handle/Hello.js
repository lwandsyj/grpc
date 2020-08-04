module.exports={
    create(call,callback){
        console.log(call.request)
        callback(null,{name:'555'})
    },
    sayHello(call,callback){
        
    }
}

