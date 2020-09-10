const path = require('path')
const fs = require('fs').promises;
const grpcClient = require('../lib/grpcClient')

const clients = new grpcClient('localhost', 4000);
clients.mapDir(path.join(__dirname, '../protos'))

async function upload() {
    const filepath = path.join(__dirname, '../public/2.jpg');
    const filecontent = await fs.readFile(filepath);
    const content = Buffer.from(filecontent,'binary')
    console.log(content)
    clients.clients.upload.upload({ content, fileName: '2.jpg' }, (err, msg) => {
        console.log(err)
        console.log(msg)
    })
}

upload();
