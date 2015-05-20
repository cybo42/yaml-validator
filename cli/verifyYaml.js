#!/usr/bin/env node
var glob = require("glob");
var fs = require("fs");
var yaml = require("js-yaml");

function verifyFile(file){
  fs.readFile(file, "utf8", function(err, buff){
    try{
      if(err) throw err;
      var data = yaml.safeLoad(buff);

    }catch(err){
     console.log("ERROR: " + file + "\n" + err.message);
    }
  });
}

glob("**/*.yaml", function(err, files){
  if(err) throw err;

  files.forEach(verifyFile);
});


