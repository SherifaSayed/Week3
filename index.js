const fs = require("fs");
const {createGzip}= require("zlib");
const readstream= fs.createReadStream("./data.txt","utf-8");
const writeStream= fs.createWriteStream("./write.txt")
const gzip= createGzip();
const writestreamzp = fs.createWriteStream("./File.gz")
readstream.on("data",(chunk)=>{
//  console.log(chunk);
 writeStream.write(chunk);
})

readstream.pipe(gzip).pipe(writestreamzp);


