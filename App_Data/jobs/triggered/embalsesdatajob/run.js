// const http = require('http');
const request = require('request');
var firebase = require('firebase');

const FB_DATABASE_URL = "https://data-embalses-pr.firebaseio.com/"
const FB_ACCOUNT_DATA = "./embalse-srv-account.json"

let lakeMatadata = {}
let lakeValues = {}
let jsonDataObj = {}

// const sourceUrl = "http://waterdata.usgs.gov/pr/nwis/uv?cb_62616=on&amp;format=rdb&amp;period=8h";
// const dataUrl = "https://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=pr&period=PT8H&parameterCd=62616&siteType=LK&siteStatus=all"

// request(dataUrl, function (err, res, body) {
//   let keyLastValue = 0

//   jsonDataObj = JSON.parse(body)
//   jsonDataObj = jsonDataObj.value.timeSeries

//   for (let source in jsonDataObj) {
//     lakeMatadata = jsonDataObj[source].sourceInfo
//     lakeValues = jsonDataObj[source].values

//     console.log(lakeMatadata.siteCode['0'].value)
//     keyLastValue = lakeValues['0'].value.length - 1
//     if (keyLastValue > 0) {
//       console.log(lakeValues['0'].value['0'].value)
//       console.log(lakeValues['0'].value[keyLastValue].value)
//     }
//   }
// })




//const embalsesNameLocation = jsonDataObj['timeSeries']

// Refactor
// 1. Create an initialization function 
// 2. Verify last value in Firebase selecting by ID
//   a. If value and date is the same do not update
//   b. If date value is newer update in Firebase

// function processData() {
//   request(sourceUrl, function (error, response, body) {
//     'use strict';
//     if (!error && response.statusCode == 200) {
//       body = body.replace(/\t/g, ' ');

//       const rawData = body.split(/\r\n|\r|\n/g);
//       let dataEmbalses = [];

//       for (let i = 0; i < rawData.length; i++) {
//         if (rawData[i].indexOf('USGS') == 0) {
//           dataEmbalses.push(rawData[i]);
//         }
//       }

//       let dataObject = {};
//       let previousSiteId = '';
//       let dataArray = [];
//       let processData = false;

      // Initialize the app with a service account, granting admin privileges
      firebase.initializeApp({
        databaseURL: FB_DATABASE_URL,
        serviceAccount: FB_ACCOUNT_DATA
      });

      firebase.database.enableLogging(true);

      const db = firebase.database();
      const ref = db.ref("/v1/embalse/siteID/50010800");
      ref.once("value", function (snapshot) {
        console.log(snapshot.val().currentLevelTime);
      });

//       for (let i = 0; i < dataEmbalses.length; i++) {

//         let data = dataEmbalses[i].split(" ");

//         if ((previousSiteId != data[1] && i != 0) || (previousSiteId == data[1] && i == dataEmbalses.length - 1)) {
//           processData = true;
//         }

//         if (processData == true) {


//           // var ref = db.ref("v0/embalse/siteID/" + previousSiteId);

//           // TODO: Create a authorization function 
//           // ref.authWithCustomToken('R2mEGvKMkJ3bB1Ni6DxeyYBfzTBl5hRaMJyTcv3s', function (error) {
//           //   if (error) {
//           //     console.log("Authentication Failed!", error);
//           //   } else {
//           //     console.log("Authenticated successfully with payload.");
//           //   }
//           // });


//           let temp = dataArray[dataArray.length - 1].split("/");
//           let currentLevelTime = temp[0];

//           // TODO: Create a isNumber function for verification
//           let currentLevel = (!isNaN(parseFloat(temp[1])) && isFinite(temp[1]) ? temp[1] : "0.0");
//           temp = dataArray[0].split("/");
//           let last8HoursLevel = (!isNaN(parseFloat(temp[1])) && isFinite(temp[1]) ? temp[1] : "0.0");

//           ref.update({
//             "currentLevel": parseFloat(currentLevel, 10),
//             "currentLevelTime": currentLevelTime,
//             "last8HoursLevel": parseFloat(last8HoursLevel, 10)
//           });

//           // const levelRef = new fb('https://data-embalses-pr.firebaseio.com/v1/embalse/level/siteID/' + previousSiteId);
//           // levelRef.authWithCustomToken('R2mEGvKMkJ3bB1Ni6DxeyYBfzTBl5hRaMJyTcv3s', function (error) {
//           //   if (error) {
//           //     console.log("Authentication Failed!", error);
//           //   } else {
//           //     console.log("Authenticated successfully with payload.");
//           //   }
//           // });

//           // levelRef.set(dataObject); Only use when charts are implemented
//           processData = false;
//           dataArray = [];
//           dataObject = {};
//         }

//         previousSiteId = data[1];
//         dataArray.push([data[2] + " " + data[3]] + "/" + data[5]);
//         dataObject[data[2] + " " + data[3]] = parseFloat(data[5], 10);
//       }
//     } else {
//       // console.log(error);
//       return "Error processing data from source url. " + error;
//     }
//   });
// }

// processData();

// Evaluate every x quantity of time
// setInterval(function () {
//   processData ();
// }, 1200);
