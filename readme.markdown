Ray's NodeReader
==============

This project creates a mobile app listing the reviews by DailyJS of node.js modules. It is limited to those reviewed in the Node Roundup feature. Since there are thousands of node.js packages in npm, DailyJS is a good filter of which ones are worth looking at.

This project started at the ModevEast Hackathon http://www.modeveast.com/hackathon/ on December 3, 2011. 

Incomplete
----------

At Hackatons the goal is to show as much of a project with the time limit even if sections are incomplete. Therefore, this project is incomplete. Also, some private information was hardcoded into files and these will be posted as they are cleaned up. See Next Steps for more details.

Code Overview
_____________

1. The first part of the code uses node.js to read the DailyJS Tags page, scrapes the screen to pull out _node_ section and then parses that into a JSON message for each module. These JSON messages are then stored in Couchdb. This code is in nodescrapper.js.
2. The mobile app is written in jQueryMobile. It pulls the list of modules from Couch, creates a listview in alpha order of the modules. When you click on the module name it takes you to the DailyJS article. This code is in nodereader.html.

The project uses: node.js, couchdb and jQuerymobile. Node packages used are request, jsdom and cradle.

Next Steps
----------
1. I need to contact to DailyJS about this since it is their content.
2. The scrapper does not track which tags have already been pushed into the database causing duplications. Need to store the 'last read' when the scrapper finishes running and read 'last read' when starting up the scrapper.
3. Modules may be reviewed more than once and I need to account for that case.
4. Mobile listing is only in alpha order. Would like to create a reverse chronological order.
5. Manifest.txt file to make it an offline app. 

Then there is a whole decision about hosting the project. Need to host both couchdb and node. For this code, I'll probably assume you are running couchdb locally and the same for nodejs.





