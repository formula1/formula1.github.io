var browserify = require("browserify");
var UglifyJS = require("uglify-js");
var fs = require("fs");
var async = require("async");

var b = browserify();
b.require("markdown");
b.require(__dirname+"/node_modules/highlight.js/lib/index.js", {expose:"highlight"});
b.require("querystring");
b.require("url");
b.bundle(function(e,buff){
  if(e) throw e;
  var min = UglifyJS.parse(buff.toString("utf-8"));
  min.figure_out_scope();
  fs.writeFile(
    __dirname+"/_site/api.min.js",
    min.print_to_string(),
    function(e){
      if(e) throw e;
      console.log("wrote the js");
    }
  );
});

var ejs = require('ejs');


async.each([
  {
    input:__dirname+"/html/blog.ejs",
    output:__dirname+"/_site/index.html"
  },
  {
    input:__dirname+"/html/article.ejs",
    output:__dirname+"/_site/article/404.html"
  }
],function(io,next){
  ejs.renderFile(
    io.input,
    {
      cur_page:{},
      htmlpath:__dirname+"/html"
    },
    function(e,file){
      if(e) throw e;
      fs.writeFile(
        io.output,
        file,
        function(e){
          if(e) return next(e);
          console.log(io.input+" was rendered as "+io.output);
        }
      );
    }
  );

},function(e,results){
  if(e) console.error("Error: "+e.stack);
});
