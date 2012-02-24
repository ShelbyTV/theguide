/*
 * This test emulates requests from arnold
 * to the resolver
 */

 // a small http lib
var http_get = require('../lib/http-get.js');

// the request
var http_options = {
  host : '127.0.0.1', //aka localhost
  port : '1337',
  path : '/resolve',
  method : 'GET'
}

// the GET params
var params = {
  url : 'http://www.youtube.com/v/p4d-SNTGxLw'
};

var params2 = {
	url: 'http://vimeo.com/30203159'
};

// function to execute once request is responded to
var callback = function(err, json_response){
  console.log('GOT RESPONSE', json_response);
};

// Youtube request
http_get.get(http_options, params, callback);

//Vimeo request (weird bug if you send both of these)
//http_get.get(http_options, params2, callback);
