const express = require("express");
const app = express();

let oldUrl;
let newUrl = "http://127.0.0.1:3000/5sz"


app.get("/favicon.ico", (req,res)=> {
    res.status(304);
});

app.get("/5sz", (req,res)=> {
    res.redirect(oldUrl);
});

app.get("/*", (req,res)=> {
    let regex = /((https)|(http))\:\/\/(()|(www))|(\w+)\.[a-zA-Z.?=\/_]+/;
    oldUrl = req.params[0];
    console.log('url passed: ', oldUrl);
    
    if(regex.test(oldUrl)) {
        res.send({
            original_url:oldUrl,
            shortened_url:newUrl});
    }
    else {
        res.send({url:"invalid"})
    }
});

app.listen(3000);