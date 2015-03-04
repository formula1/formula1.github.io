
var config = {
  cid: "dafb27cb88db35267e75",
  yqluri: "store://gdDAnJkTXAuVgzAQ8wboA2"
};

var AuthProvider = require("AuthProvider");

window.user = new AuthProvider(
  config.cid,
  yql_access(config.yqluri)
);
user.on("parse-error",function(e){
  addError({
    class:"four-zero-three",
    name:"You've failed authorization",
    message: e
  });
});
user.on("access-error",function(e){
  addError({
    class:"four-zero-three",
    name:"You've failed authorization",
    message: "You can always try again"
  });
});
$("#westoredata .buttons a.logtoggle").click(function(e){
  e.preventDefault();
  if(!user.isLoggedIn){
    return user.login();
  }
  user.logout();
  $(this).text("Log In");
});
user.on("access-success",function(token){
  console.log("access was successful");
  $("#westoredata .buttons a.logtoggle").text("Log Out");
});
