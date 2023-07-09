class Authentication {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  _request(url, options) {
    return fetch(this.url + url, options).then(this._getResponseData);
  }

  _getResponseData(res) {
    if (res.statusText === "Unauthorized") {
      return Promise.reject(`Ошибка: Не правильный логин или пароль`);
    }
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  signUp(userEmail, userPassword) {
    return this._request("signup", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        password: userPassword,
        email: userEmail,
      }),
    });
  }

  signIn(userEmail, userPassword) {
    return this._request("signin", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        password: userPassword,
        email: userEmail,
      }),
    });
  }

  signOut() {
    return this._request("signout", {
      method: "POST",
      headers: this.headers,
    });
  }

  tokenCheck() {
    return fetch(`${this.url}users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(this._getResponseData);
  }
}

export const authentication = new Authentication({
  url: "http://api.mesto.kirill.nomoredomains.work/",
  headers: {
    "Content-Type": "application/json",
  },
});
