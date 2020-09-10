const fs=require('fs').promises;
const path=require('path');

module.exports={
    async upload(call,callback){
       try{
        console.log(call)
        const {fileName,content} =call.request;
        await fs.writeFile(path.join(__dirname,'../dist',fileName),content,'binary')
        callback(null,{fileName:'111'})
       }catch(ex){
           console.log(ex)
       }
       
    }
}