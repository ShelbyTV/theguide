var qs = require('querystring')
, http = require('http');
//, agent = http.getAgent(host, 80)

module.exports = {

  _makeRequest : function(httpOpts, cb){
    var req = http.request(httpOpts, function(res){
      res.setEncoding('utf8');
      var data = '';
      res.on('data', function(d){
        data += d;
      });
      res.on('end', function(){
        try{
          data = JSON.parse(data);
        } catch (e){
          console.log('non-json response', e, data);
          return cb(e);
        }
        cb(null, data);
      });
    });
    req.end();
  },

  get : function(httpOpts, params, cb){
    var self = this; 
    if (typeof params === 'function'){
      cb = params;
      params = {};
    }
    /*var httpOpts = {
      //agent : agent,
      method : 'GET',
      host : host,
      path : path+((params) ? '?'+qs.stringify(params): '')
    };*/
    httpOpts.path = httpOpts.path + ((params) ? '?'+qs.stringify(params): '')
    this._makeRequest(httpOpts, cb);
  }

};
