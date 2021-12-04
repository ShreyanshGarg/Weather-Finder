const express = require("express");
const app=express();
const ejs = require("ejs");
const bodyparser = require("body-parser");
const https = require("https")

app.use(bodyparser.urlencoded({extended:true}));

app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/",function(req,res){
  res.render("index.ejs",{cityname:"default",EJS:"default"});
});

app.get("/compare",function(req,res){
  res.render("indexcompare.ejs")
});

app.post("/",function(req,res){

const url="https://api.openweathermap.org/data/2.5/weather?q=" + req.body.city+ "&appid=ca12fb1629468cadffc634e2c0147f83&units=metric";



https.get(url,function(response){
  response.on("data",function(data){
    const weatherdata=JSON.parse(data)
    res.render("search.ejs",{temp:weatherdata.main.temp,cityname:weatherdata.name,country:weatherdata.sys.country,value1:weatherdata.main.feels_like,value2:weatherdata.main.temp_min,value3:weatherdata.main.temp_max,value4:weatherdata.main.humidity});

  });
});



});

app.post("/compare",function(req,res){
const compare=[];


  const name1=req.body.city1;
  const name2=req.body.city2;
  function one(name1){
const urls = "https://api.openweathermap.org/data/2.5/weather?q="+name1+"&appid=ca12fb1629468cadffc634e2c0147f83&units=metric"
  https.get(urls,function(response){
  response.on("data",function(data){
    const weatherdata=JSON.parse(data);
    var post = {
      name:weatherdata.name ,
      country:weatherdata.sys.country ,
      temp:weatherdata.main.temp,
      feelslike:weatherdata.main.feels_like,
      tempmin:weatherdata.main.temp_min,
      tempmax:weatherdata.main.temp_max,
      pressure:weatherdata.main.pressure,
      humidity:weatherdata.main.humidity
    };
compare.push(post);
console.log(compare);
});
});
}
one(name1);
function two(name2){
const urls = "https://api.openweathermap.org/data/2.5/weather?q="+name2+"&appid=ca12fb1629468cadffc634e2c0147f83&units=metric"
https.get(urls,function(response){
response.on("data",function(data){
  const weatherdata=JSON.parse(data);
  var post = {
    name:weatherdata.name ,
    country:weatherdata.sys.country ,
    temp:weatherdata.main.temp,
    feelslike:weatherdata.main.feels_like,
    tempmin:weatherdata.main.temp_min,
    tempmax:weatherdata.main.temp_max,
    pressure:weatherdata.main.pressure,
    humidity:weatherdata.main.humidity
  };
compare.push(post);
console.log(compare);
setTimeout(function(){res.render("compare.ejs",{compare:compare});},3000);

});
});
}
two(name2);
  });


app.listen(4040,function(){
  console.log("server started at 4040");
});
