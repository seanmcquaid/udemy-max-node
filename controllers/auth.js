exports.getLogin = (req,res,next) => {
    // console.log(isLoggedIn)
    res.render("auth/login", {
      path: "/login",
      pageTitle : "Login",
      isAuthenticated : false
    });
};

exports.postLogin = (req,res,next)=>{
  res.setHeader("Set-Cookie", "loggedIn=true; HttpOnly");
  res.redirect("/");
}