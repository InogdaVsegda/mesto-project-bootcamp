import { openPopup } from "./popup"
import { 
    addLike,
    deleteLike,
    errorHandler 
} from "./api"
import { profileId } from "../index.js"

const gallery = document.querySelector('.elements__list')
const galleryItemTemplate = document.querySelector('#gallery-item').content

const deletePopup = document.querySelector('.popup_delete')
const galleryPopup = document.querySelector('.gallery-popup')
const galleryPopupImage = galleryPopup.querySelector('.gallery-popup__image')
const galleryPopupCaption = galleryPopup.querySelector('.gallery-popup__image-caption')

const setInitialLikes = (cardData, cardElement) => {
    const counter = cardElement.querySelector('.element__like-counter')
    counter.textContent = cardData.likes.length
}

const setDeleteButton = (cardData, cardElement) => {
    const deleteButton = cardElement.querySelector('.element__delete-button')
    if(cardData.owner._id === profileId) {
        deleteButton.removeAttribute('disabled')
    }
}

const setLiked = (cardData, cardElement) => {
    const likeButton = cardElement.querySelector('.element__like-button')
    if(cardData.likes.find(owner => owner._id === profileId)) {
        likeButton.classList.add('element__like-button_active')
    }
}

const createNewGalleryItem = (data) => {
    const newItem = galleryItemTemplate.querySelector('.element').cloneNode(true)

    const newItemImage = newItem.querySelector('.element__image')
    newItemImage.src = data.link
    newItemImage.setAttribute('alt', data.name)
    newItem.id = data._id

    const newItemName = newItem.querySelector('.element__name')
    newItemName.textContent = data.name

    const counter = newItem.querySelector('.element__like-counter')
    const likeButton = newItem.querySelector('.element__like-button')
    likeButton.addEventListener('click', (e) => {
        if(e.target.classList.contains('element__like-button_active')) {
            deleteLike(data._id)
                .then((res) => {
                    e.target.classList.remove('element__like-button_active')
                    counter.textContent = res.likes.length
                })
                .catch((err) => {
                    errorHandler(err)
                })
        } else {
            addLike(data._id)
            .then((res) => {
                e.target.classList.add('element__like-button_active')
                counter.textContent = res.likes.length
            })
            .catch((err) => {
                errorHandler(err)
            })
        }
    })

    const deleteButton = newItem.querySelector('.element__delete-button')
    deleteButton.addEventListener('click', (e) => {
        const currentCard = e.target.closest('.element')
        deletePopup.id = currentCard.id

        openPopup(deletePopup)
    })

    newItemImage.addEventListener('click', (e) => {
        galleryPopupImage.src = data.link
        galleryPopupImage.setAttribute('alt', data.name)
        galleryPopupCaption.textContent = data.name

        openPopup(galleryPopup)
    })

    setInitialLikes(data, newItem)
    setDeleteButton(data, newItem)
    setLiked(data, newItem)

    return newItem
}

const addNewGalleryItem = (card) => {
    gallery.prepend(card)
}


 
const renderGalleryItems = (data) => {
        const cards = Array.from(data).reverse()
        cards.forEach(card => {
            const newCard = createNewGalleryItem(card)
            addNewGalleryItem(newCard)
        })
}

export {
    createNewGalleryItem,
    addNewGalleryItem,
    renderGalleryItems
}