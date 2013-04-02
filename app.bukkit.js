
/**
 * Module dependencies.
 */

var express = require('express')
	, routes = require('./routes')
	, index = require('./routes/index')
	, http = require('http')
	, path = require('path');

var app = express();

rssXML = ""; // caching the rss file

app.configure(function(){
	app.set('port', process.env.PORT || 21067);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

app.get('/', index.rss);
app.get('/rss', index.rss);
app.get('/rss.xml', index.rss);

var fs = require('fs');                                                                        
console.log("Watching savedRSS.xml");
fs.watchFile('/home/yayadrian/webapps/bukkitrss/savedRSS.xml', function (curr, prev) {
  /* console.log('the current mtime is: ' + curr.mtime);
  console.log('the previous mtime was: ' + prev.mtime); */
	console.log("xml file has changed");
	rssXML = "";
});

http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});
