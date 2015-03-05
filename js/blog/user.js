
var config = {
  cid: "dafb27cb88db35267e75",
  yqluri: "store://gdDAnJkTXAuVgzAQ8wboA2"
};

var AuthProvider = require("AuthProvider");
AuthProvider.init({
  github:{
    client_id:config.cid,
    access_retriever:yql_access(config.yqluri)
  }
});
window.user = new AuthProvider();
user.on("error",function(e){
  addError({
    class:"four-zero-three",
    name:"Login Error",
    message: e
  });
});
user.on("login",function(token){
  console.log("access was successful");
  $("#westoredata .buttons a.logtoggle").text("Log Out");
});
user.on("logout",function(token){
	console.log("logout");
  $("#westoredata .buttons a.logtoggle").text("Log In");
});
$("#westoredata .buttons a.logtoggle").click(function(e){
  e.preventDefault();
  if(!user.isLoggedIn){
    return user.login();
  }
  user.logout();
});

