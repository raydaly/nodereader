// scraps dailyjs to pull all of the noderoundup articles
// from this page http://dailyjs.com/tags.html
/*  looking for this h3 with this id:
<h3 id="node">node</h3>
<ul class="posts">        
<li>
  <div>11 May 2011</div>
  <a href="/2011/05/11/node-roundup">Node Roundup: NodeConf Slides, Kanso, Whiskey, Redback</a>
</li>
*/
/* and going to create JSON similar to RSS with title, link, pubDate and categories for each
{"node": [
  {"title": "Node Roundup: NodeConf Slides, Kanso, Whiskey, Redback",
    "link": "http://dailyjs.com/2011/05/11/node-roundup",
    "pubDate": "11 May 2011",
    "categories": ["NodeConf Slides", "Kanso", "Whiskey", "Redback"]
  }
]}

*/
var request = require('request'),
    jsdom = require('jsdom'),
	cradle = require('cradle');
var nodereader = new(cradle.Connection)('http://127.0.0.1', 5984, {
	cache: true,
	raw: false
}).database('nodereader');


request({ uri:'http://dailyjs.com/tags.html' }, function (error, response, body) {
  if (error && response.statusCode !== 200) {
    console.log('Error when contacting google.com')
  }

  jsdom.env({
    html: body,
    scripts: [
      'http://code.jquery.com/jquery-1.6.min.js'
    ]
  }, function (err, window) {
    var $ = window.jQuery;

    // jQuery is now loaded on the jsdom window created from 'agent.body'
    //console.log($('#modules').next().children().length);
    //for more info see: http://blog.nodejitsu.com/jsdom-jquery-in-5-lines-on-nodejs
	$('#modules').next().children().each(function(index) {
	    console.log(index+' children first: ' + $(this).children().first().text());
	    //could probably be better, but it worked in the heat of the hackaton
		var headline={}
		headline.title=$(this).children().last().text();
		headline.link="http://dailyjs.com"+$(this).children().last().attr('href');
		headline.pubDate=$(this).children().first().text();
	    var x=$(this).children().last().text();
	    var xi=x.indexOf(":");
		if (xi>0){
			headline.categories=x.substr(xi+1).split(",");
		}
		console.log(headline);
		console.log(headline.title);
		/*
		{"node": [
		  {"title": "Node Roundup: NodeConf Slides, Kanso, Whiskey, Redback",
		    "link": "http://dailyjs.com/2011/05/11/node-roundup",
		    "pubDate": "11 May 2011",
		    "categories": ["NodeConf Slides", "Kanso", "Whiskey", "Redback"]
		  }
		]}
		
		******* so at this point I have the headline object, sorta RSS
		*/
		
		// stuff object into couchdb using cradle
		// https://github.com/cloudhead/cradle
		console.log('nodereader='+nodereader);
		headline.type="headline";
		nodereader.save(headline, function (err, res2) {
		  // Handle response TODO
		  if (err){
			console.log(err);
		  }else{
			console.log('saved');
		  }
		});
	
	});
  });
});