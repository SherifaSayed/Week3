const http= require("http");
const fs = require("fs")
const url = require("url")
const path=require("path")
 
const server= http.createServer((req,res)=>
  {
 const urlParsed=url.parse(req.url,true).pathname;
 const {method}=req;
 const FilePath=path.join(__dirname, "data.json");
 
 let data="";

 if(method=="POST"&&urlParsed=="/user")
 {
  req.on("data",(chunks)=>{
    data+=chunks;

  })
  req.on("end",()=>{
    const newuser=JSON.parse(data)
    const FileData= fs.readFileSync(FilePath,"utf-8");
    const users=JSON.parse(FileData)
    const isUserExists= users.some((user)=>user.email==newuser.email)
    if(isUserExists)
    {
      res.writeHead(200,{"content-type":"application/json"})
      res.write(JSON.stringify({ message: "user is exists" }))
      res.end();
    }
    else
    {
      users.push(newuser);
     fs.writeFileSync(FilePath, JSON.stringify(users, null, 2)); res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User added successfully" }));

    }

  })

 }
 else 
   {
      res.writeHead(404,{"content-type":"text/plain"})
      res.write("invalid url or method ")
   }
    
});



server.listen(3000,()=>{

    console.log("server is running")
 })