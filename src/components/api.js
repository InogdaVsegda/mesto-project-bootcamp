const config = {
  baseUrl: 'https://nomoreparties.co/v1/wbf-cohort-4',
  headers: {
    authorization: '69841b0c-ffa1-4828-ad6c-fb1275884ba5',
    'Content-Type': 'application/json'
  }
}

const responseHandler = (response) => {
  if(response.ok) {
    return response.json()
  }
  return Promise.reject(`Ошибка: ${response.status}`)
}

const errorHandler = (err) => {
  console.log(err)
}

const getInitialCards  = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
    }).then(res => {
        return responseHandler(res)
      })
}

const getProfileData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
    }).then(res => {
        return responseHandler(res)
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
    }).then(res => {
        return responseHandler(res)
      })
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
      return responseHandler(res)
    })
}

const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(res => {
      return responseHandler(res)
    }) 
}

const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  }).then(res => {
      return responseHandler(res)
    }) 
}

const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(res => {
      return responseHandler(res)
    }) 
}

const updateAvatar = (imageLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: imageLink
    })
  }).then(res => {
      return responseHandler(res)
    }) 
}


export { 
  getInitialCards, 
  getProfileData, 
  updateProfileData, 
  addCard, 
  deleteCard, 
  addLike,
  deleteLike,
  updateAvatar,
  errorHandler
}