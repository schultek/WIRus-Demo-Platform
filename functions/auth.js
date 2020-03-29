
const functions = require('firebase-functions');
const admin = require("firebase-admin");
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");

function createToken(user) {

  let options = {
    algorithm: "RS256",
    issuer: "demo-platform",
    audience: "wirus-app"
  }

  if (user) {
    options.subject = user;
  }

  return jwt.sign({}, functions.config().env.keys.private, options)
}

async function requestAccessToken(user, token) {

  let platformToken = createToken(user);

  return fetch("https://wirus-app.firebaseapp.com/api/auth/token?idToken="+token, {
    headers: {
      Authorization: "Bearer "+platformToken
    }
  }).then(res => {
    if (res.status == 200) {
      return res.text();
    } else {
      return res.text().then(body => { throw new Error("Got error on requesting access token: "+body); })
    }
  });

}

async function verifyToken(token) {

  let pubKey = await fetch("https://wirus-app.firebaseapp.com/api/auth/public_key").then(res => res.text())

  return jwt.verify(token, pubKey, {
    issuer: "wirus-app",
    audience: "demo-platform"
  })

}

async function verifyUserToken(req) {
  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else {
    throw new Error("User authentication token is missing.");
  }

  return admin.auth().verifyIdToken(idToken);
}

exports.createToken = createToken;
exports.requestAccessToken = requestAccessToken;
exports.verifyToken = verifyToken;
exports.verifyUserToken = verifyUserToken;