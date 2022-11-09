export const BASE_URL = "https://api.loner.nomoredomains.icu";

const request = ({ url, method = "POST", token, data }) => {
  return fetch(`${BASE_URL}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...!!token && { "Authorization": `Bearer ${token}` },
    },
    ...!!data && { body: JSON.stringify(data) },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка ${res.status}`);
  });
};

export const register = (email, password) => {
  return request({
    url: "/signup",
    data: { password, email },
  });
};

export const authorize = (email, password) => {
  return request({
    url: "/signin",
    data: { password, email },
  });
};

export const getContent = (token) => {
  return request({
    url: "/users/me",
    method: "GET",
    token,
  });
};
