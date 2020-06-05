const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

require('dotenv').config();

const admin = require('firebase-admin');
admin.initializeApp();

const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

exports.sendEmail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        if (req.method !== 'POST') {
            return;
        }

        const mailOptions = {
            from: req.body.from,
            replyTo: req.body.from,
            to: req.body.to === undefined ? 'columbiavirtualcampus@gmail.com' : req.body.to,
            subject: req.body.subject,
            text: req.body.text,
            html: `<p>${req.body.text}</p>`
        };

        mailTransport.sendMail(mailOptions)
            .then(() => {
                return res.status(200).send("success");
            }).catch((err) => {
            return res.status(500).send(err);
        });

    });

});

exports.approveEvent = functions.https.onRequest((req, res) => {
    cors(req,
        res, () => {
            if (req.method !== 'GET') {
                return;
            }
            var db = admin.firestore();
            db.collection('events').doc(req.query.eventId).update({ approved: true })
                .then(() => {
                    return res.status(200).send("success");
                }).catch((err) => {
                return res.status(500).send(err);
            });
        });
});

// https://zoom.us/oauth/authorize?response_type=code&client_id=OApwkWCTsaV3C4afMpHhQ&redirect_uri=http%3A%2F%2Fdesktop-hnqifrq.local%3A3000%2Fcall
exports.sendZoomRequest = functions.https.onRequest(async (req, res) => {

  cors(req, res, async () => {
    console.log(req.body);
    const request = require('request-promise');

      var db = admin.firestore();
      var requestedZoomLink = false;

    // Check if we are creating a meeting. If we are we need to get info from database
      /*console.log("--------------"+JSON.stringify(req.body)+"--------------")
      if (req.body.query !== undefined && req.body.query.updateDatabase === true) {

          console.log("--------------"+req.body.query.eventId+"--------------")
          db.collection('events').doc(req.body.query.eventId).get()
              .then(doc => {
                  console.log("Got doc");
                  // eslint-disable-next-line promise/always-return
                  if (!doc.exists) {
                      console.log('No such document!');
                      return res.status(403).send("No such document exists in database!");
                  } else {
                      console.log("----------------------------")
                      console.log("----------------------------")
                      console.log("----------------------------")
                      console.log('Document data:', doc.data());
                      console.log("----------------------------")
                      console.log("----------------------------")
                      console.log("----------------------------")
                      const data = doc.data();
                      requestedZoomLink = data.zoomLink;
                      const date = new Date(data.start_date.split("GMT")[0]);
                      req.body.start_time = date.getFullYear() + "-" + (date.getMonth() + 1)
                                        + "-" + date.getDate() + "T" + date.getHours() + ":" + date.getMinutes()
                                        + ":" + date.getSeconds();
                      req.body.timezone = data.timezone;
                      req.body.topic = data.event;
                      req.agenda = data.desc;
                      req.password = data.start_date.toString('base64');
                  }
              })
              .catch(err => {
                  console.log('Error getting document', err);
                  return res.status(403).send("Could not get document in database");
              });

          if (requestedZoomLink === undefined) {
              return res.status(400).send("User did not request a zoom link.")
          } else if (requestedZoomLink !== true) {
              return res.status(406).send("User already has a zoom link.")
          }

      }*/

      console.log("-----------------------------------")
    request.post(req.body,
        function (err, httpResponse, body) {
          console.log(err);
          if (body.error) {
              console.log("Reported err: " + body.error);
              return res.status(403).send("failed posting to call zoom api: " + body.error);
          }

          // Check if we need to update database
          /*if (req.body.query !== undefined) {
              if (req.body.query.updateDatabase === true) {
                      db.collection('events').doc(req.body.query.eventId).update({zoomLink: body.data.join_url})
                          .then(() => {
                              return res.status(200).send("success");
                          }).catch((err) => {
                          return res.status(500).send("Failed updating database: " + err);
                      });

              }
          }*/

          return res.status(200).send(body);
        }
    );
  })
});

exports.getEventInfoById = functions.https.onRequest((req, res) => {
    cors(req,
        res, () => {
            /*if (req.method !== 'GET') {
                console.log("Returned");
                return;
            }*/
            var db = admin.firestore();
            console.log(req.body.query)
            db.collection('events').doc(req.query.eventId).get()
                .then(doc => {
                    console.log("Got doc");
                    // eslint-disable-next-line promise/always-return
                    if (!doc.exists) {
                        console.log('No such document!');
                        return res.status(403).send("No such document exists in database!");
                    } else {
                        console.log("----------------------------")
                        console.log("----------------------------")
                        console.log("----------------------------")
                        console.log('Document data:', doc.data());
                        console.log("----------------------------")
                        console.log("----------------------------")
                        console.log("----------------------------")
                        const data = doc.data();
                        return res.status(200).send(data);
                    }
                })
                .catch(err => {
                    console.log('Error getting document', err);
                    return res.status(403).send("Could not get document in database");
                });
        });
});

exports.addZoomLinkToDB = functions.https.onRequest((req, res) => {
    cors(req,
        res, () => {
            if (req.method !== 'GET') {
                return;
            }
            var db = admin.firestore();
            //if (req.query.zoomLink === true) {
                db.collection('events').doc(req.query.eventId).update({zoomLink: req.query.zoomLink})
                    .then(() => {
                        return res.status(200).send("success");
                    }).catch((err) => {
                        return res.status(500).send(err);
                    });
            /*} else {
                if (req.query.zoomLink === undefined) {
                    return res.status(400).send("User did not request a zoom link.")
                } else {
                    return res.status(406).send("User already has a zoom link.")
                }
            }*/
        });
});

exports.approveEvent = functions.https.onRequest((req, res) => {
  cors(req,
    res, () => {
      if (req.method !== 'GET') {
        return;
      }
      var db = admin.firestore();
      db.collection('events').doc(req.query.eventId).update({ approved: true })
        .then(() => {
          return res.status(200).send("success");
        }).catch((err) => {
          return res.status(500).send(err);
        });
    });
});
