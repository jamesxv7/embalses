const http = require('http');
const request = require('request');
const fb = require('firebase');

request(process.env.SourceUrl,
function (error, response, body) {
    'use strict';
    if (!error && response.statusCode == 200) {
        let dataEmbalses = [];

        body = body.replace(/\t/g, ' ');
        const rawData = body.split(/\r\n|\r|\n/g);

        for (let i = 0; i < rawData.length; i++) {
            if (rawData[i].indexOf('USGS') == 0) {
                dataEmbalses.push(rawData[i]);
            }
        }

        let dataObject = {};
        let previousSiteId = '';
        let dataArray = [];
        let processData = false;

        for (let i = 0; i < dataEmbalses.length; i++) {

            let data = dataEmbalses[i].split(" ");

            if ((previousSiteId != data[1] && i != 0) || (previousSiteId == data[1] && i == dataEmbalses.length - 1)) {
                processData = true
            }

            if (processData == true) {
                const ref = new fb(process.env.SiteIdData + previousSiteId);
                ref.authWithCustomToken(process.env.FirebaseSecret, function (error) {
                    if (error) {
                        console.log("Authentication Failed!", error);
                    } else {
                        console.log("Authenticated successfully with payload.");
                    }
                });

                let temp = dataArray[dataArray.length - 1].split("/");
                let currentLevelTime = temp[0];
                let currentLevel = temp[1];
                temp = dataArray[0].split("/");
                let last8HoursLevel = temp[1];

                ref.update({
                    "currentLevel": parseFloat(currentLevel, 10),
                    "currentLevelTime": currentLevelTime,
                    "last8HoursLevel": parseFloat(last8HoursLevel, 10)
                });

                const levelRef = new fb(process.env.SiteIdLevel + previousSiteId);
                levelRef.authWithCustomToken(process.env.FirebaseSecret, function (error) {
                    if (error) {
                        console.log("Authentication Failed!", error);
                    } else {
                        console.log("Authenticated successfully with payload.");
                    }
                });
                levelRef.set(dataObject);
                processData = false;
                dataArray = [];
                dataObject = {};
            }

            previousSiteId = data[1];
            dataArray.push([data[2] + " " + data[3]] + "/" + data[5]);
            dataObject[data[2] + " " + data[3]] = parseFloat(data[5], 10);
        }
    } else {
        console.log(error);
    }
});
// Nasty hack to graceful shutdown webJobs
setTimeout(function () {
    process.exit();
}, 30000);