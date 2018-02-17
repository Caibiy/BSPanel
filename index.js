const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const { exec } = require('child_process')
const pug = require('pug')
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'')))
//api design
app.post('/api/user',(req,res)=>{
 res.json({user:"root"});
})
app.post('/api/config',(req,res)=>{
var flag=req.body.flag;
if(flag=='wifi')
{
  
}
res.json({flag:req.body.flag});
})
app.get('/',(req,res)=>{
res.sendfile(path.join(__dirname,'index.html'))
})
//Show progress status
app.get('/api/ps',(req,res)=>{
  exec('sh ./bin/ps.sh',(err,stdout,stderr)=>{
  res.json(callback(err,stdout,stderr));
})
})
//Show current OS user
app.get('/api/user',(req,res)=>{
exec('sh ./bin/user.sh',(error,stdout,stderr)=>{
    res.send(pug.renderFile("./view/user.pug",callback(error,stdout,stderr)))
})
})
//Show current directory of file
app.get('/api/ls',(req,res)=>{
 exec('sh ./bin/ls.sh',(error,stdout,stderr)=>{
 res.json(callback(error,stdout,stderr));
})
})
//Show Dir status
app.get('/api/dstatus',(req,res)=>{
exec('bash ./bin/dstatus.sh',(error,stdout,stderr)=>{
  res.json(callback(error,stdout,stderr));
})
})
//显示文件在磁盘中的占用率
app.get('/api/fstatus',(req,res)=>{
if(req.query){
exec("sh ./bin/fstatus.sh "+req.query.file,(error,stdout,stderr)=>{
res.json(callback(error,stdout,stderr));
})
}else{
res.json({"eror":"没有传递参数"})
}
})
//查询当前wifi是否已经配置
app.get('/api/wifi',(req,res)=>{
  exec("sh ./bin/wifista.sh",(error,stdout,stderr)=>{
    res.json(callback(err,stdout,stderr));
})
})
app.listen(8080,()=>{
console.log("Server is running on port: 8080")
})

function callback(err,stdout,stderr,spar="\n"){
if(err){
return {"exec error":err}
}
if(stdout){
return {"flag":"success","data":(stdout.trim()).split(spar)};
}
if(stderr){
return {"flag":"error"}
}
}
