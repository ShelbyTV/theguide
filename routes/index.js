/*
 * Routes.
 */

var http_get = require('../lib/http-get.js');
// matches all requests made to /resolve
exports.resolve = function(req, res){

  /*
   * TODO : 
   * 1. determine video provider from url (ie youtube or vimeo)
   * 2. make call to appropriate api
   * 3. format youtube/vimeo API response (if necessary)
   * 4. respond to Arnold with nicely formatted JSON
   */

  //global youtube data
  var gdata;

  //regular expressions to check for
  var youtubeRegEx = new RegExp("youtube.com");
  var vimeoRegEx = new RegExp("vimeo.com");

  //Callbacks for API requests
  var gdataYoutube = function(err, json_response) {
    if(!err){
      gdata = json_response;
      http_get._makeRequest(oembedYoutubeOptions, oembedYoutube);
    } else {
      res.send({error: 'GDATA ERROR'});
    }
  }

  var oembedYoutube = function(err, json_response) {
    if(!err){
      var youtubeData = {
        provider_url: json_response.provider_url,
        description: gdata.entry.media$group.media$description.$t,
        title: json_response.title,
        url: "http://www.youtube.com/watch?v=" + gdata.entry.media$group.yt$videoid.$t,
        author_name: json_response.author_name,
        height: json_response.height,
        width: json_response.width,
        html: json_response.html,
        thumbnail_width: json_response.thumbnail_width,
        version: json_response.version,
        provider_name: json_response.provider_name,
        thumbnail_url: json_response.thumbnail_url,
        type: json_response.type,
        thumbnail_height: json_response.thumbnail_height,
        author_url: json_response.author_url
      };
	  console.log("Here");
      res.send(youtubeData);
    } else {
      res.send({error: "ERROR"});
    }
  }

  var apiVimeo = function(err, json_response) {
    if(!err){
      var vimeoData = {
        provider_url: json_response.provider_url,
        description: json_response.description,
        title: json_response.title,
        author_name: json_response.author_name,
        height: json_response.height,
        width: json_response.width,
        html: json_response.html,
        thumbnail_width: json_response.thumbnail_width,
        version: json_response.version,
        provider_name: json_response.provider_name,
        thumbnail_url: json_response.thumbnail_url,
        type: json_response.type,
        thumbnail_height: json_response.thumbnail_height,
        author_url: json_response.author_url
      }
      res.send(vimeoData);
    } else {
      res.send({error: "DIDNT WORK"});
    }
  }
  
  if(req.query.url.match(youtubeRegEx)) {
      var lastY = req.query.url.lastIndexOf("=");
      var yid = req.query.url.substring(lastY+1);

      //youtube api call options
      var gdataOptions = {
        host: 'gdata.youtube.com',
        path: '/feeds/api/videos/' + yid + '?v=2&alt=json',
        method: 'GET'
      };

      var oembedYoutubeOptions = {
        host: 'www.youtube.com',
        path: '/oembed?url=http%3A//www.youtube.com/watch%3Fv%3D' + yid + '&format=json&maxheight=360&maxwidth=480',
        method: 'GET'
      };

      http_get._makeRequest(gdataOptions, gdataYoutube);
  } else if(req.query.url.match(vimeoRegEx)) {
      var lastV = req.query.url.lastIndexOf("/");
      var vid = req.query.url.substring(lastV+1);

      var vimeoOptions = {
        host: 'vimeo.com',
        path: '/api/oembed.json?url=http%3A//vimeo.com/' + vid,
        method: 'GET'
      };

      http_get._makeRequest(vimeoOptions, apiVimeo);
  } else {
      res.send({msg: "Not Supported"});
  }

};
