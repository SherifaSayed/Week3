const http = require("http")
const path= require("path")
const fs = require("fs")
const url =require("url")
const jsonfile= path.join(__dirname, "data.json");
const server= http.createServer((req,res)=>
{
 const urlParsed=url.parse(req.url,true).pathname;
 const {method}=req;

if(method=="DELETE"&&urlParsed.includes("/user"))
{
       const id= urlParsed.split("/")[2]
        const FileData= fs.readFileSync(jsonfile,"utf-8")
        const users= JSON.parse(FileData) 
        const userindex =users.findIndex((userid)=>userid.id==id)
      
        if(userindex==-1)
        {
            res.writeHead(404, { "content-type": "application/json" });
          return res.end(JSON.stringify({ message: "user not found" }));

        }
        
             users.splice(userindex, 1);
           
            fs.writeFileSync(jsonfile,JSON.stringify(users,null,2) )
            res.writeHead(200,{"content-type":"application/json"})
            res.write(JSON.stringify(users, null, 2))
            res.end("user is deleted ")
        
       

    }




})

const port=3000;
server.listen(port,()=>{
    console.log("server is running")
})