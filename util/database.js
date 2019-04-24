const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

const url = "mongodb+srv://sean:trumpet15@cluster0-un7wn.mongodb.net/test?retryWrites=true"

const mongoConnect = (callback)=>{
    MongoClient.connect(url)
    .then((client)=>{
        console.log("connected")
        callback(client)
    })
    .catch((err)=>{
        console.log(err)
    });
}

module.exports = mongoConnect;