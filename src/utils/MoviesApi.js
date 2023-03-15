import { EXTERNAL_API_URL } from '../utils/constants';

export const getAllMovies = () => {
  return fetch(`${EXTERNAL_API_URL}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
  });
};
