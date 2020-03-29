const functions = require('firebase-functions');
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

const {createToken, requestAccessToken, verifyToken, verifyUserToken} = require("./auth");

// get firestore instance
admin.initializeApp();

// create express app
const app = express();

app.use((req, _, next) => {
  console.log(req.originalUrl);
  next();
})

// generates a general platform token
// only accessible for same origin requests
app.get("/api/token", (req, res) => {

  let platformToken = createToken();

  res.send(platformToken);
})

app.get("/api/verify", async (req, res) => {

  try {

    let token = await verifyToken(req.query.token);

    if (token.sub.startsWith("ac:")) {

      let user = token.platformSubject;
      let authToken = await admin.auth().createCustomToken(user)
      
      res.send({auth_token: authToken});

    } else if (token.sub.startsWith("id:")) {
      if (token.method == "signin") {

        let user = await admin.auth().createUser({})

        let accessToken = await requestAccessToken(user.uid, req.query.token);
        let authToken = await admin.auth().createCustomToken(user.uid);

        res.send({auth_token: authToken, access_token: accessToken})

      } else {
        res.send({});
      }
    }

  } catch (err) {
    res.status(401).send(err.message);
  }
})

app.get("/api/connect/existing", async (req, res) => {

  try {

    let token = await verifyToken(req.query.token);

    if (!token.sub.startsWith("id:")) {
      throw new Error("Provided token is not an id token");
    }

    let user = await verifyUserToken(req);

    let accessToken = await requestAccessToken(user.uid, req.query.token);
    res.send(accessToken);

  } catch (err) {
    res.status(401).send(err.message);
  }

})

app.get("/api/connect/new", async (req, res) => {

  try {

    let token = await verifyToken(req.query.token);

    if (!token.sub.startsWith("id:")) {
      throw new Error("Provided token is not an id token");
    }

    let user = await admin.auth().createUser({});

    let accessToken = await requestAccessToken(user.uid, req.query.token);
    let authToken = await admin.auth().createCustomToken(user.uid);

    res.send({auth_token: authToken, access_token: accessToken})

  } catch (err) {
    res.status(401).send(err.message);
  }

})

app.get("/api/public_key", cors({origin: true}), (req, res) => {
  res.send(functions.config().env.keys.public);
})

exports.app = functions.https.onRequest(app);