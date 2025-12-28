const http = require("http")
const path= require("path")
const fs = require("fs")
const url =require("url")
const jsonfile= path.join(__dirname, "data.json");
const server= http.createServer((req,res)=>
{
 const urlParsed=url.parse(req.url,true).pathname;
 const {method}=req;

if(method=="GET"&&urlParsed.includes("/user"))
{
   
    
        
        const FileData= fs.readFileSync(jsonfile,"utf-8")
        const users= JSON.parse(FileData)
             res.writeHead(200,{"content-type":"application/json"})
              res.write(JSON.stringify(users, null, 2))
              res.end();

}


})

const port=3000;
server.listen(3000,()=>{
    console.log("server is running")
})