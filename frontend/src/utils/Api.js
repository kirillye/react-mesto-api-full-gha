class Api {
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

  getCards() {
    return this._request("cards", {
      headers: this.headers,
      credentials: "include",
    });
  }

  getUserInfo() {
    return this._request("users/me", {
      headers: this.headers,
      credentials: "include",
    });
  }

  sendCard({ articleTitle, linkImage }) {
    return this._request("cards", {
      method: "POST",
      headers: this.headers,
      credentials: "include",
      body: JSON.stringify({
        name: articleTitle,
        link: linkImage,
      }),
    });
  }

  changeLikeCardStatus(id, statur) {
    if (statur) {
      return this._request(`cards/${id}/likes`, {
        method: "DELETE",
        headers: this.headers,
        credentials: "include",
      });
    } else {
      return this._request(`cards/${id}/likes`, {
        method: "PUT",
        headers: this.headers,
        credentials: "include",
      });
    }
  }

  removeCard(id) {
    return this._request(`cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
      credentials: "include",
    });
  }

  sendUserInfo(data) {
    return this._request("users/me", {
      method: "PATCH",
      headers: this.headers,
      credentials: "include",
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  sendUserAvatar(avatar) {
    return this._request("users/me/avatar", {
      method: "PATCH",
      headers: this.headers,
      credentials: "include",
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
  }
}

export const api = new Api({
  url: "http://localhost:4000/",
  headers: {
    authorization: "329c4ea8-6d08-414a-aa1f-2a25b10eec2c",
    "Content-Type": "application/json",
  },
});
