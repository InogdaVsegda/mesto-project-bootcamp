import { createNewGalleryItem, addNewGalleryItem, renderGalleryItems } from './cardsServer'
import { updateProfileData, addCard, updateAvatar, deleteCard } from './api'
import { setProfileData } from './profile'

const popups = Array.from(document.querySelectorAll('.popup'))
const popupEdit = document.querySelector('.popup_edit')
const popupAdd = document.querySelector('.popup_add')
const popupAvatar = document.querySelector('.popup_avatar')
const popupDelete = document.querySelector('.popup_delete')

const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')
const avatarButton = document.querySelector('.profile__image-hover')

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

const openPopup = (popupElement) => {
    popupElement.classList.add('popup_opened')
    window.addEventListener('keydown', handleEscape)
}

const closePopup = (popupElement) => {
    window.removeEventListener('keydown', handleEscape)
    popupElement.classList.remove('popup_opened')
}

const handleEscape = (e) => {
    if (e.key === 'Escape') {
        const currentPopup = document.querySelector('.popup_opened')
        closePopup(currentPopup)
    }
}

const renderLoading = (button, isLoading) => {
    if(isLoading) {
        switch(button) {
            case formDeleteSubmit:
                button.value = 'Удаление...'
                break
            default:
                button.value = 'Сохранение...'
                break
        }
    } else {
        switch(button) {
            case formDeleteSubmit:
                button.value = 'Да'
                break
            case formAddSubmit:
                button.value = 'Создать'
                break
            default:
                button.value = 'Сохранить'
                break
        }
    }

    console.log(res)
}

const handleFormEditSubmit = (evt) => {
    evt.preventDefault()
    renderLoading(formEditSubmit, true)
    setTimeout(() => {
        updateProfileData(formInputName.value, formInputDescription.value)
        setProfileData()
        closePopup(popupEdit)
        evt.target.reset()
    }, 500)
}

const handleFormAddSubmit = (evt) => {
    evt.preventDefault()
    renderLoading(formAddSubmit, true)
    setTimeout(() => {
        addCard(formIputPlace.value, formIputLink.value)
        .then((res) => {
            const newPlace = res.name
            const newLink = res.link
            const id = res._id
            const newItem = createNewGalleryItem({name: newPlace, link: newLink, id})
            newItem.querySelector('.element__delete-button').removeAttribute('disabled')
            addNewGalleryItem(newItem)
        })
        closePopup(popupAdd)
        evt.target.reset()
    }, 500) 
}

const handleFormAvatarSubmit = (evt) => {
    evt.preventDefault()
    renderLoading(formAvatarSubmit, true)
    profileAvatar.src = formInputAvatarLink.value
    setTimeout(() => {
        updateAvatar(formInputAvatarLink.value)
        closePopup(popupAvatar)
        evt.target.reset()
    }, 500)
}

const handleFormDeleteSubmit = (evt) => {
    evt.preventDefault()
    renderLoading(formDeleteSubmit, true)
    setTimeout(() => {
        const deleteId = evt.target.closest('.popup_delete').id
        document.getElementById(deleteId).remove()

        deleteCard(deleteId)

        closePopup(popupDelete)
    }, 500)
}

const addEditButtonListener = () => {
    editButton.addEventListener('click', () => {
        formInputName.value = profileName.textContent
        formInputDescription.value = profileDescription.textContent
        openPopup(popupEdit)
    })
}

const addAddButtonListener = () => {
    addButton.addEventListener('click', () => {
        openPopup(popupAdd)
    })
}

const addAvatarButtonListener = () => {
    avatarButton.addEventListener('click', () => {
        openPopup(popupAvatar)
    })
}

const addClosePopupsListener = () => {
    popups.forEach((popup) => {
        popup.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('popup_opened')) {
                closePopup(popup)
            }
            if (e.target.classList.contains('popup__close-button')) {
                closePopup(popup)
            }
        })
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

export { 
    formAvatarSubmit, 
    formEditSubmit, 
    formAddSubmit,
    formDeleteSubmit,
    setPopupListeners,
    renderLoading,
    openPopup,
}