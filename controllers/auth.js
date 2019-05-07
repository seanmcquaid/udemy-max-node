const User = require("../models/user");

exports.getLogin = (req,res,next) => {
  // console.log(req.session.isLoggedIn)
    res.render("auth/login", {
      path: "/login",
      pageTitle : "Login",
      isAuthenticated : false
    });
};

exports.postLogin = (req,res,next)=>{
  User.findById("5cc65fd7bf79fa24b83ec285")
  .then((user)=>{
      req.session.isLoggedIn = true;
      req.session.user = user
      // console.log(req.user)
      res.redirect("/");
  }).catch((err)=>{
      console.log(err)
  });
};