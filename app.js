const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//import dabatabase
const UrlDb = require("./db.js");

let baseUrl = "http://127.0.0.1:3000/";
let newUrl;
let randomString;

let originalUrl;
// 1-9 --> 49-57
// A-Z 65-90
// a-z 97 - 122


app.use(express.static(__dirname + "/"));

app.get("/", (req, res) => {
    res.sendFile("index.html");
});

app.get("/favicon.ico", (req, res) => {
    res.status(304);
});

/* ---------- info routes -----------*/
app.get("/autoDelete", (req,res)=> {
    UrlDb.findOneAndRemove({
    },(err)=> {
        if(err) {
            console.log(err);
        }
        res.send("data deleted")
        console.log('data deleted');
    });
});



app.get("/auxview", (req,res)=> {
    UrlDb.find({},(err,data)=> {
        if(err) {
            console.log(err);
        }
        res.json(data);
    });
});
/* ---------------------------------- */

// FIRST -- create
app.get("/new/:getUrl(*)", (req, res) => {

    function generateRndStr() {
        let rndArr = [];
        for (let i = 0; i < 4; i++) {
            let num = Math.floor(Math.random() * 100 + 49);
            if (num >= 49 && num <= 57 || num >= 65 && num <= 90 || num >= 98 && num <= 122) {
                rndArr.push(String.fromCharCode(num));
            }
        }
        return rndArr.join("");
    }
    
    let regex = /(http|https):\/\/(www|\w+)\.{0,1}[\w]+\.[A-z/]+/g;
    originalUrl = req.params.getUrl;
 
    if(regex.test(originalUrl)) {
        randomString = generateRndStr();
        newUrl = baseUrl + randomString;
        // if url check passes, write to the database
        let objToDb = new UrlDb({
            _original_url: originalUrl,
            _shortened_url: newUrl,
            _shortString: randomString
        });
        objToDb.save((err) => {
            if (err) {
                console.log(err);
            }
            console.log('wrote to data');
            res.redirect("/view/" + randomString);
        });
    }
    else {
        res.json({
            _original_url:originalUrl,
            error: "The url provided is invalid"
        });
    }    
});
// SECOND -- view without _id
app.get("/view/:randomString", (req,res, next)=> {

    let passedString = req.params.randomString;
    UrlDb.findOne({
        _shortString: passedString
    }, (err,data)=> {
        if(err) {
            console.log(err);
        }
        res.json({
            original_url: data._original_url,
            shortened_url: data._shortened_url
        });
    });
});

// THIRD -- redirect
app.get("/:urlToFoward(*)", (req,res)=> {
    
    let paramToCheck = req.params.urlToFoward;
    console.log('to je param ki je bil poslan: ', paramToCheck);
    UrlDb.findOne({
        _shortened_url:baseUrl + paramToCheck
    }, (err, data)=> {
        if(err) {
            console.log(err);
        }
        res.redirect(data._original_url);
    });
});



/*
   http://localhost:3000/new/https://en.wikipedia.org/wiki/Main_Page
*/


app.listen(process.env.PORT || 3000);