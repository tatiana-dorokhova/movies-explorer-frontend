import { MAIN_API_URL, EXTERNAL_API_URL } from './constants';

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // каждый метод возвращает promise, который будем обрабатывать уже при вызове
  // методов в конкретных компонентах

  // общий метод для всех методов, который проверяет результат на корректность,
  // и возвращает ответ в виде json (или прокидывает ошибку)
  _handlePromise(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // загрузка всех сохраненных фильмов
  getSavedCards() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: this._headers,
    }).then((res) => this._handlePromise(res));
  }

  // сохранение фильма
  // в ответе будет полная карточка с _id, который выдала база, и с owner-ом
  saveMovie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    id,
    nameRU,
    nameEN,
  }) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image: `${EXTERNAL_API_URL}${image.url}`,
        trailerLink,
        thumbnail: `${EXTERNAL_API_URL}${image.formats.thumbnail.url}`,
        movieId: id,
        nameRU,
        nameEN,
      }),
    }).then((res) => this._handlePromise(res));
  }

  // удаление фильма
  deleteMovie(cardId) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this._handlePromise(res));
  }

  // загрузка информации о пользователе с сервера
  // свойство _id в ответе — это идентификатор пользователя
  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => this._handlePromise(res));
  }

  // редактирование профиля
  // свойство _id в ответе — это идентификатор пользователя
  editUser({ newUserName, newUserAbout }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newUserName,
        about: newUserAbout,
      }),
    }).then((res) => this._handlePromise(res));
  }
}

export const api = new Api({
  baseUrl: MAIN_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
