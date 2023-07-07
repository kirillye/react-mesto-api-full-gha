class Authentication {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  _request(url, options) {
    return fetch(this.url + url, options).then(this._getResponseData);
  }

  _getResponseData(res) {
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

  tokenCheck(token) {
    return fetch(`${this.url}users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._getResponseData);
  }
}

export const authentication = new Authentication({
  url: "https://auth.nomoreparties.co/",
  headers: {
    "Content-Type": "application/json",
  },
});
