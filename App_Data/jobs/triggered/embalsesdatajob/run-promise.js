const https = require('https');
const fb = require('firebase');

const FB_DATABASE_URL = "https://data-embalses-pr.firebaseio.com/"
const FB_ACCOUNT_DATA = "./embalse-srv-account.json"
const DATA_URL = "https://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=pr&period=PT8H&parameterCd=62616&siteType=LK&siteStatus=all"

// Initialize Firebase Database Service
fb.initializeApp({
  databaseURL: FB_DATABASE_URL,
  serviceAccount: FB_ACCOUNT_DATA
});

fb.database.enableLogging(true);

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

function processData() {
  getContent(DATA_URL)
    .then((rawData) => {
      let jsonDataObj = JSON.parse(rawData)
      jsonDataObj = jsonDataObj.value.timeSeries
      // Get latest date values from Db
      fb.database()
        .ref("/v1/embalse/siteID")
        .once("value")
        .then(function (data) {
          let rawLakeAndDate = "{"
          for (lake in data.val()) {
            rawLakeAndDate += '"' + lake + '":' + '"' + data.val()[lake].currentLevelTime + '",'
          }
          rawLakeAndDate = (rawLakeAndDate.slice(0, -1)) + "}"
          const lakeDataFromDb = JSON.parse(rawLakeAndDate)
          // Start working with data from Water Services API
          for (let lake in jsonDataObj) {
            const lakeValues = jsonDataObj[lake].values
            const listSize = lakeValues['0'].value.length - 1

            // Lets work only with lakes with sample points
            if (listSize > 0) {
              const siteID = jsonDataObj[lake].sourceInfo.siteCode['0'].value
              const latestDateFromDb = lakeDataFromDb[siteID]

              // Update only new values
              let newDate = lakeValues['0'].value[listSize].dateTime
              newDate = newDate.substring(0, newDate.indexOf("."))
                .replace(/[TZ]/g, " ")
              if (newDate !== latestDateFromDb) {
                fb.database()
                  .ref(`/test/embalse/siteID/${siteID}`)
                  .update({
                    "currentLevel": parseFloat(lakeValues['0'].value[listSize].value, 10),
                    "currentLevelTime": newDate,
                    "last8HoursLevel": parseFloat(lakeValues['0'].value['0'].value, 10)
                  })
              }
            }
          }
        });
    })
    .catch((err) => console.log(err))
}

// Run every 2 mins
setInterval(processData,
  120000
)
