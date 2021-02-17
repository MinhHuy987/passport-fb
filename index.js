const express=require('express');
const app=express();
const ejs=require('ejs');
const path=require('path')
const PORT=process.env.PORT || 2021;
app.set('views','view');
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'/public')));

app.get('/',(req,res)=>{
    res.render('test',{node:'abcxyz'})
});
app.listen(PORT,(req,res)=>{
    console.log(`server runing at ${PORT} `)
})