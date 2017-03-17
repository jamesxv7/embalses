const https = require('https');
// const request = require('request');
var firebase = require('firebase');

const FB_DATABASE_URL = "https://data-embalses-pr.firebaseio.com/"
const FB_ACCOUNT_DATA = "./embalse-srv-account.json"

let lakeMatadata = {}
let lakeValues = {}
let jsonDataObj = {}
let lakeDataFromFb = {}
let stringData = "{"

// const sourceUrl = "http://waterdata.usgs.gov/pr/nwis/uv?cb_62616=on&amp;format=rdb&amp;period=8h";
const dataUrl = "https://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=pr&period=PT8H&parameterCd=62616&siteType=LK&siteStatus=all"

const getContent = function (url) {
  // return new pending promise
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      // handle http errors
      if (res.statusCode < 200 || res.statusCode > 399) {
        reject(new Error('Failed to load page, status code: ' + res.statusCode));
      }
      // temporary data holder
      const body = [];
      // on every content chunk, push it to the data array
      res.on('data', (chunk) => body.push(chunk));
      // we are done, resolve promise with those joined chunks
      res.on('end', () => resolve(body.join(''))
      );
    });
    // handle connection errors of the request
    req.on('error', (err) => reject(err))
  })
};

getContent(dataUrl)
  .then((html) => {
    jsonDataObj = JSON.parse(html)
    jsonDataObj = jsonDataObj.value.timeSeries

    firebase.initializeApp({
      databaseURL: FB_DATABASE_URL,
      serviceAccount: FB_ACCOUNT_DATA
    });

    firebase.database.enableLogging(true);

    firebase.database()
      .ref("/v1/embalse/siteID")
      .once("value")
      .then(function (snapshot) {
        for (embalse in snapshot.val()) {
          stringData += '"' + embalse + '":' + '"' + snapshot.val()[embalse].currentLevelTime + '",'
        }
        stringData = (stringData.slice(0, -1)) + "}"
        lakeDataFromFb = JSON.parse(stringData)

        for (let lake in jsonDataObj) {
          lakeMatadata = jsonDataObj[lake].sourceInfo
          lakeValues = jsonDataObj[lake].values
          const siteID = lakeMatadata.siteCode['0'].value
          latestDateFromDb = lakeDataFromFb[siteID]
          let keyLastValue = lakeValues['0'].value.length - 1

          if (keyLastValue > 0) {
            newDate = lakeValues['0'].value[keyLastValue].dateTime
            newDate = newDate
              .substring(0, newDate.indexOf("."))
              .replace(/[TZ]/g, " ")
            // console.log(lakeValues['0'].value['0'].value)
            // console.log(lakeValues['0'].value[keyLastValue].value)
          }
        }
      });
  })
  .catch((err) => console.log(err))
