const mongoose = require("mongoose"), Admin = mongoose.mongo.Admin;

mongoose.connect("mongodb://fatmike:A10Warthog@ds161471.mlab.com:61471/fatmongodb", {
    useMongoClient:true
});

let Schema = mongoose.Schema;

let urlShrtSchema = new Schema({
    _original_url: String,
    _shortened_url: String,
    _shortString: String
});

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=> {
    console.log('connected');
});

let UrlDb = mongoose.model("urlshortener", urlShrtSchema);

module.exports = UrlDb;