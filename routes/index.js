
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Bukk.it RSS' });
};

exports.rss = function(req, res){
// serve the rss feed
	res.write(rssXML);
	res.end();
};