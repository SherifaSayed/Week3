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
        const id = urlParsed.split("/")[2]
    
        
        const FileData= fs.readFileSync(jsonfile,"utf-8")
        const users= JSON.parse(FileData)
        const finduser= users.find((allusers)=>allusers.id==id)

        if(finduser){
             res.writeHead(200,{"content-type":"application/json"})
              res.write(JSON.stringify(finduser, null, 2))
              res.end();
        }
        else
        {
            res.writeHead(404,{"content-type":"text/text"})
            res.write(JSON.stringify("user not fond"))
            res.end()

        }


}


})

const port=3000;
server.listen(3000,()=>{
    console.log("server is running")
})