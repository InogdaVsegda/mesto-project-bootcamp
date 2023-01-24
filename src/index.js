import './pages/index.css';

import { enableValidation } from './components/validation.js'

import { 
    renderGalleryItems, 
    createNewGalleryItem, 
    addNewGalleryItem 
} from './components/cards.js'

import { 
    getProfileData, 
    updateProfileData, 
    addCard, 
    updateAvatar, 
    deleteCard, 
    errorHandler, 
    getInitialCards 
} from './components/api.js'

import { 
    openPopup, 
    closePopup, 
    addClosePopupsListener 
} from './components/popup';

const popupEdit = document.querySelector('.popup_edit')
const popupAdd = document.querySelector('.popup_add')
const popupAvatar = document.querySelector('.popup_avatar')
const popupDelete = document.querySelector('.popup_delete')

const profileName = document.querySelector('.profile__name')
const profileDescription = document.querySelector('.profile__description')
const profileAvatar = document.querySelector('.profile__avatar')

const formEdit = document.forms['edit-profile']
const formAdd = document.forms['add-item']
const formAvatar = document.forms['avatar']
const formDelete = document.forms['delete-card']

const formAvatarSubmit = formAvatar.querySelector('.form__button')
const formEditSubmit = formEdit.querySelector('.form__button')
const formAddSubmit = formAdd.querySelector('.form__button')
const formDeleteSubmit = formDelete.querySelector('.form__button')

const formInputName = formEdit.querySelector('.form__item_el_name')
const formInputDescription = formEdit.querySelector('.form__item_el_description')
const formIputPlace = formAdd.querySelector('.form__item_el_place')
const formIputLink = formAdd.querySelector('.form__item_el_link')
const formInputAvatarLink = formAvatar.querySelector('.form__item_el_avatar')

export let profileId = ''

const setProfileData = (data) => {
    profileName.textContent = data.name
    profileDescription.textContent = data.about
    profileAvatar.src = data.avatar
    profileId = data._id
}

const renderLoading = (button, buttonText) => {
    button.textContent = buttonText
}

const handleFormEditSubmit = (evt) => {
    evt.preventDefault()
    renderLoading(formEditSubmit, 'Сохранение...')
    updateProfileData(formInputName.value, formInputDescription.value)
        .then(data => {
            profileName.textContent = data.name
            profileDescription.textContent = data.about
            profileAvatar.src = data.avatar
            closePopup(popupEdit)
            evt.submitter.classList.add('form__button_inactive')
            evt.submitter.setAttribute('disabled', '')
            evt.target.reset()
        })
        .catch((err) => {
            errorHandler(err)
          })
        .finally(() => renderLoading(formEditSubmit, 'Сохранить'))
}
        

const handleFormAddSubmit = (evt) => {
    evt.preventDefault()
    renderLoading(formAddSubmit, 'Сохранение...')
    addCard(formIputPlace.value, formIputLink.value)
        .then((res) => {
            const newItem = createNewGalleryItem(res)
            addNewGalleryItem(newItem)
        })
        .then(() => {
            closePopup(popupAdd)
            evt.submitter.classList.add('form__button_inactive')
            evt.submitter.setAttribute('disabled', '')
            evt.target.reset()
        })
        .catch((err) => {
            errorHandler(err)
          })
        .finally(() => renderLoading(formAddSubmit, 'Создать'))
}

const handleFormAvatarSubmit = (evt) => {
    evt.preventDefault()
    renderLoading(formAvatarSubmit, 'Сохранение...')
    updateAvatar(formInputAvatarLink.value)
        .then (data => {
            profileAvatar.src = data.avatar
            closePopup(popupAvatar)
            evt.submitter.classList.add('form__button_inactive')
            evt.submitter.setAttribute('disabled', '')
            evt.target.reset()
        })
        .catch((err) => {
            errorHandler(err)
          })
        .finally(() => renderLoading(formAvatarSubmit, 'Сохранить'))
}

const handleFormDeleteSubmit = (evt) => {
    evt.preventDefault()
    renderLoading(formDeleteSubmit, 'Удаление...')
        const deleteId = evt.target.closest('.popup_delete').id

        deleteCard(deleteId)
        .then(() => {
            document.getElementById(deleteId).remove()
            closePopup(popupDelete)
        })
        .catch((err) => {
            errorHandler(err)
          })
        .finally(() => renderLoading(formDeleteSubmit, 'Удалить'))
}

const addEditButtonListener = () => {
    const editButton = document.querySelector('.profile__edit-button')
    editButton.addEventListener('click', () => {
        formInputName.value = profileName.textContent
        formInputDescription.value = profileDescription.textContent
        openPopup(popupEdit)
    })
}

const addAddButtonListener = () => {
    const addButton = document.querySelector('.profile__add-button')
    addButton.addEventListener('click', () => {
        openPopup(popupAdd)
    })
}

const addAvatarButtonListener = () => {
    const avatarButton = document.querySelector('.profile__image-hover')
    avatarButton.addEventListener('click', () => {
        openPopup(popupAvatar)
    })
}

const setPopupListeners = () => {
    addEditButtonListener()
    addAddButtonListener()
    addAvatarButtonListener()
    addClosePopupsListener()

    formEdit.addEventListener('submit', handleFormEditSubmit)
    formAdd.addEventListener('submit', handleFormAddSubmit)
    formAvatar.addEventListener('submit', handleFormAvatarSubmit)
    formDelete.addEventListener('submit', handleFormDeleteSubmit)
}


Promise.all([ 
    getProfileData(), 
    getInitialCards() 
]) 
    .then(([data, initialCards])=>{   
        setProfileData(data)
        renderGalleryItems(initialCards)
    }) 
    .catch((err)=>{
        errorHandler(err)
    })


setPopupListeners()

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_inactive',
    inputErrorClass: 'form__item_type_error',
    errorClass: 'form__item-error_active'
})
