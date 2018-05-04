console.log('server.js');

var express=require('express');
var hbs=require('hbs');
var app=express();
var fs=require('fs');
app.set('view engine','hbs');
hbs.registerPartials(__dirname +'/views/partials');
 
//method for static page
hbs.registerHelper('getYear',()=>{
    return new Date().getFullYear()+' is displayed by helper'
});
hbs.registerHelper('Size',(text)=>{
    return text.toUpperCase();
});

app.use((req,res,next)=>{ //order of req and res must be imp
    var now=new Date().toString();
    console.log(req.method);
   var log=`${now}:${req.method}:${req.url}`;
   console.log(log);
   fs.appendFileSync('server.log',log+'\n');
    next();
});
/*app.use((req,res,next)=>{
    res.render('maintain.hbs');

});//use as a maintainence page*/
app.use(express.static(__dirname +'/public'));
app.get('/',(req,res)=>
{
  
    res.render('home.hbs',{
    pagetitle:'Home Page'
   //its Object is currently using by footer.hbs for MVC     
});
});
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pagetitle:'Handle Page',
        year:'Copyrights '+new Date().getFullYear()+'  and Time is '+new Date().getHours()+':'+new Date().getMinutes()
    });
});

app.listen(3000,()=>{
    console.log('server is running at port 3000');
    //listem takes 2 args 1st poort no. and 2nd function
    //which runs @starts of an app
});  
