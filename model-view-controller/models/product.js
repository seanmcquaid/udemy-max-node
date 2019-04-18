const fs = require("fs");
const path = require("path");

module.exports = class Product {
    constructor(title){
        this.title = title;
    }

    save(){
        const p = path.join(
            path.dirname(process.mainModule.filename),
            "data",
            "products.json"
        );
        fs.readFile(p, (error, fileContent)=>{
            let products = [];
            if(!error){
                products = JSON.parse(fileContent)
            }
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (error2)=>{
                console.log(error2)
            });
        });
    }

    static fetchAll(cb){
        const p = path.join(
            path.dirname(process.mainModule.filename),
            "data",
            "products.json"
        );
        fs.readFile(p, (err, fileContent)=>{
            if(err){
                cb([]);
            }
            cb(JSON.parse(fileContent))
        })
    }
}