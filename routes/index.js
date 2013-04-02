
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.rss = function(req, res){
// serve the rss feed
if(rssXML === "") {
	console.log("Getting RSS from file");

	var fs = require('fs');
	fs.readFile("./savedRSS.xml", function (err, data) {
		if (err) {
			console.log("Error");
			throw err;
		}

		// console.log("Data returned OK");
		rssXML = data;
		res.write(rssXML);
		res.end();	

	});
} else {
	console.log("RSS from variable");

	res.write(rssXML);
	res.end();
}


};