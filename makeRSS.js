
function makeRSS(callback) {

// make the rss feed
	var cheerio = require('cheerio'),
		request = require('request'),
		RSS = require('rss');

	var numberOfItems = 50;

	request({uri: 'http://bukk.it/?C=M;O=D'}, makeFeed);

    function makeFeed(err, response, body){
		var self = this;
		self.items = {};
			// check we got something good back
		if(err && response.statusCode !== 200) {
			console.log('Request error.');
			return false;
		}

		$ = cheerio.load(body);

		/* lets create an rss feed */
		var feed = new RSS({
						title: 'bukk.it RSS',
						description: 'An RSS Feed for Bukk.it',
						feed_url: 'http://bukk.it.rss.yay.li/rss.xml',
						site_url: 'http://bukk.it',
						image_url: 'http://bukk.it/favicon.ico',
						author: 'Bukk.it'
				});

		$links = $('tr');
		var num = 0;

		$links.each(function (i, item) {
			// limit to 20 items for now
			if(i >= numberOfItems) { return false; }

			console.log($(item).find('td a').text());

			var fileName = $(item).find('td a').text();
			var fileURL  = "http://bukk.it/" + fileName;
			var fileDate = $(item).find('td:nth-child(3)').text();
			var fileSize = $(item).find('td:nth-child(4)').text();

			if(fileName && fileURL && fileDate && fileSize ) {
				var badHTML = '<h1>' + fileName + '</h1><img src="' + fileURL +'" /> <p>Size:' + fileSize + '</p>';
				badHTML += '<a href="' + fileURL +'">' + fileURL + '</a>';
				
			/* loop over data and add to feed */

				feed.item({
						title:  fileName,
						description: badHTML,
						url: fileURL, // link to the item
						guid: fileURL, // optional - defaults to url
						author: 'bukk.it', // optional - defaults to feed author property
						date: fileDate // any format that js Date can parse.
				});
				
				num++;
			}
		});
		
		rssXML = feed.xml();
		callback(rssXML);
	}
}

exports.now = makeRSS;