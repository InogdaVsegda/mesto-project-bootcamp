const initialCards = [
    {
      name: 'Гудаури',
      link: 'https://images.unsplash.com/photo-1547564334-8fee402e8fa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80'
    },
    {
      name: 'гора Казбек',
      link: 'https://images.unsplash.com/photo-1563284223-333497472e88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80'
    },
    {
      name: 'Местиа',
      link: 'https://images.unsplash.com/photo-1649684024230-914382ec2da0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1299&q=80'
    },
    {
      name: 'Мцхета',
      link: 'https://images.unsplash.com/photo-1661618828856-e5d1ddeb826f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2158&q=80'
    },
    {
      name: 'Сванетия',
      link: 'https://images.unsplash.com/photo-1668846488612-7dcac5776df7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
      name: 'Тбилиси',
      link: 'https://images.unsplash.com/photo-1561731172-9d906d7b13bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
    }
]; 

const container = document.querySelector('.container')
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

const gallery = document.querySelector('.elements__list')
const galleryItemTemplate = document.querySelector('#gallery-item').content
const galleryPopupTemplate = document.querySelector('#gallery-popup').content

const addNewGalleryItem = ({ name, link }) => {
    const newItem = galleryItemTemplate.querySelector('.element').cloneNode(true)
    newItemImage = newItem.querySelector('.element__image')
    newItemImage.setAttribute('src', link)
    newItemImage.setAttribute('alt', name)

    newItemName = newItem.querySelector('.element__name')
    newItemName.textContent = name

    const likeButton = newItem.querySelector('.element__like-button')
    likeButton.addEventListener('click', (e) => {
        e.target.classList.toggle('element__like-button_active')
    })

    const deleteButton = newItem.querySelector('.element__delete-button')
    deleteButton.addEventListener('click', (e) => {
        e.target.closest('.element').remove()
    })

    newItem.addEventListener('click', (e) => {
        const newGalleryPopup = galleryPopupTemplate.querySelector('.gallery-popup').cloneNode(true)

        const galleryPopupImage = newGalleryPopup.querySelector('.gallery-popup__image')
        galleryPopupImage.setAttribute('src', link)

        const galleryPopupCaption = newGalleryPopup.querySelector('.gallery-popup__image-caption')
        galleryPopupCaption.textContent = name

        const galleryPopupClose = newGalleryPopup.querySelector('.popup__close-button')
        const closeGalleryPopup = () => {
            closePopup(newGalleryPopup)
        }
        galleryPopupClose.addEventListener('click', closeGalleryPopup)

        container.append(newGalleryPopup)

        openPopup(newGalleryPopup)
    })

    gallery.prepend(newItem)
}

const closeGalleryPopup = () => {
    closePopup(newGalleryPopup)
}
 
const renderGalleryItems = (arr) => {
    arr.forEach(item => addNewGalleryItem(item))
}

renderGalleryItems(initialCards)

const openPopup = (popupElement) => {
    popupElement.classList.add('popup_opened')
}

const closePopup = (popupElement) => {
    popupElement.classList.remove('popup_opened')
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
    addNewGalleryItem(newGalleryItem)
    formIputPlace.value = ''
    formIputLink.value = ''
    closePopup(popupAdd)
}

editButton.addEventListener('click', () => {
    formInputName.value = profileName.textContent
    formInputDescription.value = profileDescription.textContent
    openPopup(popupEdit)
})
addButton.addEventListener('click', () => {
    openPopup(popupAdd)
})
popupCloseButtons.forEach((closeButton) => {
    closeButton.addEventListener('click', () => {
        const openedPopup = document.querySelector('.popup_opened')
        closePopup(openedPopup)
    })
})
formEdit.addEventListener('submit', handleFormEditSubmit)
formAdd.addEventListener('submit', handleFormAddSubmit)





