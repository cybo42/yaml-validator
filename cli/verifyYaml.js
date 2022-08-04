#!/usr/bin/env node
var glob = require("glob");
var fs = require("fs");
var util = require("util");
var yaml = require("js-yaml");
var debug = require("debug")

var log = debug("yaml");
var body = debug("body");

var bodyDepth = process.env["BODY_DEPTH"] || 1;

function verifyFile(file){
  console.log("Verify file", file);
  fs.readFile(file, "utf8", function(err, buff){
    try{
      if(err) throw err;
      var data = yaml.safeLoad(buff);
      body("File %s, body %s", file, util.inspect(data, false, bodyDepth, true));

    }catch(err){
     console.log("ERROR: " + file + "\n" + err.message);
    }
  });
}

glob("**/*.yaml", function(err, files){
  if(err) throw err;
  log("files = ", files);

  files.forEach(verifyFile);
});

glob("**/*.yml", function(err, files){
  if(err) throw err;
  log("files = ", files);

  files.forEach(verifyFile);
});

