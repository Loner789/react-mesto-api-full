export const BASE_URL = 'https://api.loner.nomoredomains.icu';

const handleResponse = (res) =>
  res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);

const request = ({ url, method = 'POST', token, data }) => {
  return fetch(`${BASE_URL}${url}`, {
    credentials: 'include',
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(!!token && { Authorization: `Bearer ${token}` }),
    },
    ...(!!data && { body: JSON.stringify(data) }),
  });
};

export const register = (email, password) => {
  return request({
    url: '/signup',
    data: { password, email },
  }).then(handleResponse);
};

export const authorize = (email, password) => {
  return request({
    url: '/signin',
    data: { password, email },
  }).then(handleResponse);
};

export const getContent = (token) => {
  return request({
    url: '/users/me',
    method: 'GET',
    token,
  }).then(handleResponse);
};

export const logout = () => {
  return request({
    url: '/logout',
  });
};
