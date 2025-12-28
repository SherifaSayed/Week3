const http = require("http")
const path= require("path")
const fs = require("fs")
const url =require("url")
const jsonfile= path.join(__dirname, "data.json");
const server= http.createServer((req,res)=>
{
 const urlParsed=url.parse(req.url,true).pathname;
 const {method}=req;

if(method=="PATCH"&&urlParsed.includes("/user"))
{
    const id= urlParsed.split("/")[2]
    let body=""
    req.on("data",(chunks)=>{
        body+=chunks
     
    })
    req.on("end",()=>
    {
        
        const FileData= fs.readFileSync(jsonfile,"utf-8")
        const users= JSON.parse(FileData)
        
        const newData= JSON.parse(body)
        const user =users.find((userid)=>userid.id==id)
      
        if(user)
        {
        
            Object.assign(user, newData);
            fs.writeFileSync(jsonfile,JSON.stringify(users,null,2) )
            res.writeHead(200,{"content-type":"application/json"})
            res.write(JSON.stringify(users, null, 2))
            res.end("updated")

        }
        else 
        {
            res.writeHead(200,{"content-type":"text/plane"})
             res.write(JSON.stringify({ message: "user id is not exists" }))
              res.end();
        }


    })

}


})

const port=3000;
server.listen(3000,()=>{
    console.log("server is running")
})