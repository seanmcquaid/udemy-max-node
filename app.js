const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const errorController = require('./controllers/error');
const User = require("./models/user");

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req,res,next)=>{
    // add in userId
//     User.findById("5cc1e629a7598b55b9ccd878")
//     .then((user)=>{
//         // console.log(user.dataValues)
//         req.user = user
//         // console.log(req.user)
//         next();
//     }).catch((err)=>{
//         console.log(err)
//     });
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect("mongodb+srv://sean:trumpet15@cluster0-un7wn.mongodb.net/shop?retryWrites=true", {useNewUrlParser:true})
.then(result=>{
    User.findOne().then((user)=>{
        if(!user){
            const user = new User({
                name : "Sean",
                email: "hello@gmail.com",
                cart: {
                    items: []
                }
            });
            user.save()
        }
    }).catch((err)=>{
        console.log(err)
    })
    app.listen(3000);
}).catch(err=>{
    console.log(err)
})
