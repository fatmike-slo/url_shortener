// init project

// git pull the repository so you can copy and push it again
const express = require('express');
const app = express();
const bodyParser = require("body-parser");

let url = "";
let newUrl = "https://3-api-url-shortener.glitch.me/5s1";
// http://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname + "/"));

app.get("/favicon.ico", (req,res)=> {
  res.status(304);
});

app.get("/", (req,res)=> {
  res.sendFile("index.html");
});

app.get("/5s1", (req,res)=> {
  res.redirect(url);
});


app.get("/*", (req,res)=> {

  // this regex will let pass almost every url (with or withour www etc). It still have to be a regualar expexted url starting with http(s);      
  let regex = /((https)|(http))\:\/\/(()|(www))|(\w+)\.[a-zA-Z.?=\/_]+/;
  url = req.params[0];
  
  if(regex.test(url)) {
    res.send({original_url:url, shortened_url:newUrl});
    }
  else {
    res.send({original_url:url, shortened_url:"invalid url parameters"})
    }
});


/*   https://3-api-url-shortener.glitch.me/    */
// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
