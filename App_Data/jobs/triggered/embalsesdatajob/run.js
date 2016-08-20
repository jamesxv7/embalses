// const http = require('http');
const request = require('request');
var firebase = require('firebase');

const sourceUrl = "http://waterdata.usgs.gov/pr/nwis/uv?cb_62616=on&amp;format=rdb&amp;period=8h";

// Refactor
// 1. Create an initialization function 
// 2. Verify last value in Firebase selecting by ID
//   a. If value and date is the same do not update
//   b. If date value is newer update in Firebase

function processData() {
  request(sourceUrl, function (error, response, body) {
    'use strict';
    if (!error && response.statusCode == 200) {
      body = body.replace(/\t/g, ' ');

      const rawData = body.split(/\r\n|\r|\n/g);
      let dataEmbalses = [];

      for (let i = 0; i < rawData.length; i++) {
        if (rawData[i].indexOf('USGS') == 0) {
          dataEmbalses.push(rawData[i]);
        }
      }

      let dataObject = {};
      let previousSiteId = '';
      let dataArray = [];
      let processData = false;

      // Initialize the app with a service account, granting admin privileges
      firebase.initializeApp({
        databaseURL: "https://data-embalses-pr.firebaseio.com/",
        serviceAccount: "./embalse-srv-account.json"
      });

      firebase.database.enableLogging(true);

      var db = firebase.database();
      var ref = db.ref("/");
      ref.once("value", function (snapshot) {
        console.log(snapshot.val());
      });

      for (let i = 0; i < dataEmbalses.length; i++) {

        let data = dataEmbalses[i].split(" ");

        if ((previousSiteId != data[1] && i != 0) || (previousSiteId == data[1] && i == dataEmbalses.length - 1)) {
          processData = true;
        }

        if (processData == true) {


          // var ref = db.ref("v0/embalse/siteID/" + previousSiteId);

          // TODO: Create a authorization function 
          // ref.authWithCustomToken('R2mEGvKMkJ3bB1Ni6DxeyYBfzTBl5hRaMJyTcv3s', function (error) {
          //   if (error) {
          //     console.log("Authentication Failed!", error);
          //   } else {
          //     console.log("Authenticated successfully with payload.");
          //   }
          // });


          let temp = dataArray[dataArray.length - 1].split("/");
          let currentLevelTime = temp[0];

          // TODO: Create a isNumber function for verification
          let currentLevel = (!isNaN(parseFloat(temp[1])) && isFinite(temp[1]) ? temp[1] : "0.0");
          temp = dataArray[0].split("/");
          let last8HoursLevel = (!isNaN(parseFloat(temp[1])) && isFinite(temp[1]) ? temp[1] : "0.0");

          ref.update({
            "currentLevel": parseFloat(currentLevel, 10),
            "currentLevelTime": currentLevelTime,
            "last8HoursLevel": parseFloat(last8HoursLevel, 10)
          });

          // const levelRef = new fb('https://data-embalses-pr.firebaseio.com/v1/embalse/level/siteID/' + previousSiteId);
          // levelRef.authWithCustomToken('R2mEGvKMkJ3bB1Ni6DxeyYBfzTBl5hRaMJyTcv3s', function (error) {
          //   if (error) {
          //     console.log("Authentication Failed!", error);
          //   } else {
          //     console.log("Authenticated successfully with payload.");
          //   }
          // });

          // levelRef.set(dataObject); Only use when charts are implemented
          processData = false;
          dataArray = [];
          dataObject = {};
        }

        previousSiteId = data[1];
        dataArray.push([data[2] + " " + data[3]] + "/" + data[5]);
        dataObject[data[2] + " " + data[3]] = parseFloat(data[5], 10);
      }
    } else {
      // console.log(error);
      return "Error processing data from source url. " + error;
    }
  });
}

processData();

// Evaluate every x quantity of time
// setInterval(function () {
//   processData ();
// }, 1200);
