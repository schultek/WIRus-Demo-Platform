export async function signInWithWIRus() {
  let token = await fetch("/api/token")
    .then(res => res.text());

  window.location = "https://wirus-app.firebaseapp.com/signin?platform=demo-platform&token=" + token;
}

export function verifyToken(token) {

  return fetch("/api/verify?token=" + token)
    .then(res => {
      if (res.status == 200) {
        return res.json();
      } else {
        return res.text().then(body => {
          throw new Error(body);
        });
      }
    })
    .then(data => {
      if (data && data.access_token) {
        localStorage.setItem("__wirus_token", data.access_token);
      } else {
        localStorage.setItem("__wirus_token", token);
      }

      if (data.auth_token) {
        return data.auth_token;
      }
    })

}

export async function connectExistingUser(token) {

  let idToken = localStorage.getItem("__wirus_token");

  if (!idToken) {
    throw new Error("No wirus id token present.");
  }

  return fetch("/api/connect/existing?token=" + idToken, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then(res => {
      if (res.status == 200) {
        return res.text();
      } else {
        return res.text().then(body => {
          throw new Error(body);
        });
      }
    })
    .then(accessToken => {
      localStorage.setItem("__wirus_token", accessToken);
    })
}

export async function connectNewUser() {

  let idToken = localStorage.getItem("__wirus_token");

  if (!idToken) {
    throw new Error("No wirus id token present.");
  }

  return fetch("/api/connect/new?token=" + idToken)
    .then(res => {
      if (res.status == 200) {
        return res.json();
      } else {
        return res.text().then(body => {
          throw new Error(body);
        });
      }
    })
    .then(({
      access_token,
      auth_token
    }) => {
      localStorage.setItem("__wirus_token", access_token);
      return auth_token;
    })
}