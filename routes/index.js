/*
 * Routes.
 */

// matches all requests made to /resolve
exports.resolve = function(req, res){

  /*
   * TODO : 
   * 1. determine video provider from url (ie youtube or vimeo)
   * 2. make call to appropriate api
   * 3. format youtube/vimeo API response (if necessary)
   * 4. respond to Arnold with nicely formatted JSON
   */
 
  // test response
  var response_json = {
    msg : 'you have reached the resolver',
    params : req.query 
  };
  
  // respond with JSON stringified response_json
  res.send(JSON.stringify(response_json));
};
