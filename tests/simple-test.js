/*
 * This test emulates requests from arnold
 * to the resolver
 */

 // a small http lib
var http_get = require('../lib/http-get.js');

// the request
var http_options = {
  host : '127.0.0.1', //aka localhost
  port : '3000',
  path : '/resolve',
  method : 'GET'
}

// the GET params
var params = { 
  url : 'http://www.youtube.com/watch?v=BV9lC0u24Ik'
};

// function to execute once request is responded to
var callback = function(err, json_response){
  console.log('GOT RESPONSE', json_response);
};

// execute the request
http_get.get(http_options, params, callback);
