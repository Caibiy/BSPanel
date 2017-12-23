const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const { exec } = require('child_process');
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'')))

app.get('/',(req,res)=>{
res.sendfile(path.join(__dirname,'index.html'))
})
//Show progress status
app.get('/api/ps',(req,res)=>{
  exec('ps -la',(err,stdout,stderr)=>{
  res.send(callback(err,stdout,stderr));
})
})
//Show current OS user
app.get('/api/user',(req,res)=>{
exec('echo "User:${USER}"',(error,stdout,stderr)=>{
 res.send(callback(error,stdout,stderr));
})
})
//Show current directory of file
app.get('/api/ls',(req,res)=>{
 exec('ls -a',(error,stdout,stderr)=>{
 res.send(callback(error,stdout,stderr));
})
})
app.listen(8080,()=>{
console.log("Server is running on port: 8080")
})

function callback(err,stdout,sterr,spar="\n"){
if(err){
console.err('exec errpr:'+err)
}
if(stdout){
return {"flag":"success","data":(stdout.trim()).split(spar)};
}
}
