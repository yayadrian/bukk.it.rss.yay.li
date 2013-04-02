console.log("running");

(function RSSfile() {

// make the rss feed
	var jsdom = require('jsdom')
	, request = require('request');

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
								//Send the body param as the HTML code we will parse in jsdom
			//also tell jsdom to attach jQuery in the scripts and loaded from jQuery.com
			jsdom.env({
												html: body,
												scripts: ['http://code.jquery.com/jquery-1.6.min.js']
								}, function(err, window){
				 //Use jQuery just as in a regular HTML page
											
												var $ = window.jQuery;
												

												var RSS = require('rss');

												/* lets create an rss feed */
												var feed = new RSS({
																title: 'bukk.it RSS',
																description: 'An RSS Feed for Bukk.it',
																feed_url: 'http://example.com/rss.xml',
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
														// 
														
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
												

												var fs = require('fs');
												// var DateFormat = require('dateformatjs').DateFormat;
												// var df = new DateFormat("\yyyyMMMdd_HHmmss");
												// var fileName = 'savedRSS\\' + df.format(new Date()) + '.xml'; 
												var fileName = "/home/yayadrian/webapps/bukkitrss/savedRSS.xml";

												fs.writeFile(fileName, feed.xml(), function(err) {
												    if(err) {
												        console.log(err);
												    } else {
												        console.log("The file was saved!");
														var date = new Date();
														console.log("File updated: " + date);
												    }
												}); 



								});
	};
})()

//exports.RSSfile = RSSfile;