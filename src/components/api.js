import {
  renderLoading, 
  formAvatarSubmit, 
  formEditSubmit, 
  formAddSubmit, 
  formDeleteSubmit
} from './popup.js'

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wbf-cohort-4',
  headers: {
    authorization: '69841b0c-ffa1-4828-ad6c-fb1275884ba5',
    'Content-Type': 'application/json'
  }
}

const getInitialCards  = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
    })
      .then(res => {
        if(res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(data => Array.from(data).reverse())
      .catch((err) => {
        console.log(err);
      })
}

const getProfileData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    })
      
}

const updateProfileData = (newName, newLink) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newLink
    })
  }).catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(formEditSubmit, false))
}

const addCard = (newName, newLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      link: newLink
    })
  }).then(res => {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }).catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(formAddSubmit, false))
}

const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(formDeleteSubmit, false))
}

const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  }).catch((err) => {
      console.log(err);
    })
}

const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).catch((err) => {
    console.log(err);
  })
}

const updateAvatar = (imageLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: imageLink
    })
  }).catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(formAvatarSubmit, false))
}


export { 
  getInitialCards, 
  getProfileData, 
  updateProfileData, 
  addCard, 
  deleteCard, 
  addLike,
  deleteLike,
  updateAvatar
}