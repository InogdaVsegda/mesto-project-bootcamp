import { createNewGalleryItem, addNewGalleryItem } from './card'

const popups = Array.from(document.querySelectorAll('.popup'))
const popupEdit = document.querySelector('.popup_edit')
const popupAdd = document.querySelector('.popup_add')
const popupCloseButtons = document.querySelectorAll('.popup__close-button')

const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')

const profileName = document.querySelector('.profile__name')
const profileDescription = document.querySelector('.profile__description')

const formEdit = document.querySelector('.form_edit')
const formAdd = document.querySelector('.form_add')
const formInputName = formEdit.querySelector('.form__item_el_name')
const formInputDescription = formEdit.querySelector('.form__item_el_description')
const formIputPlace = formAdd.querySelector('.form__item_el_place')
const formIputLink = formAdd.querySelector('.form__item_el_link')

export const openPopup = (popupElement) => {
    popupElement.classList.add('popup_opened')
    window.addEventListener('keydown', addEscListener)
}

const closePopup = (popupElement) => {
    popupElement.classList.remove('popup_opened')
    popupElement.removeEventListener('keydown', addEscListener)
}

const addEscListener = (e) => {
    const currentPopup = document.querySelector('.popup_opened')
    if (e.key === 'Escape') {
        closePopup(currentPopup)
    }
}

const handleFormEditSubmit = (evt) => {
    evt.preventDefault()
    profileName.textContent = formInputName.value
    profileDescription.textContent = formInputDescription.value
    closePopup(popupEdit)
}

const handleFormAddSubmit = (evt) => {
    evt.preventDefault()
    const name = formIputPlace.value
    const link = formIputLink.value
    const newGalleryItem = {
        name,
        link
    }
    const newCard = createNewGalleryItem(newGalleryItem)
    addNewGalleryItem(newCard)
    closePopup(popupAdd)

    formIputPlace.value = ''
    formIputLink.value = ''
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

const addCloseButtonsListener = () => {
    popupCloseButtons.forEach((closeButton) => {
        closeButton.addEventListener('click', () => {
            const openedPopup = document.querySelector('.popup_opened')
            closePopup(openedPopup)
        })
    })
}

const addClosePopupsListener = () => {
    popups.forEach((popup) => {
        popup.addEventListener('click', (e) => {
            if (e.target.classList.contains('popup')) {
                closePopup(popup)
            }
        })
    })
}




export const setPopupListeners = () => {
    addEditButtonListener()
    addAddButtonListener()
    addCloseButtonsListener()
    addClosePopupsListener()

    formEdit.addEventListener('submit', handleFormEditSubmit)
    formAdd.addEventListener('submit', handleFormAddSubmit)
}
