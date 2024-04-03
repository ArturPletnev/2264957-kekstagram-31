const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstgagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET : 'GET',
  POST: 'POST',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const load = (route, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if(!response.ok) {
        throw new Error();
      }
      return response.json();
    });

const getData = () => load(Route.GET_DATA, Method.GET);

const sendData = (body) => load (Route.SEND_DATA, Method.POST, body);

export {getData, sendData};