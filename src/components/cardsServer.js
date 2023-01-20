import { openPopup } from "./popup"
import { getInitialCards, deleteCard, addLike, deleteLike } from "./api"

const gallery = document.querySelector('.elements__list')
const galleryItemTemplate = document.querySelector('#gallery-item').content

const deletePopup = document.querySelector('.popup_delete')
const galleryPopup = document.querySelector('.gallery-popup')
const galleryPopupImage = galleryPopup.querySelector('.gallery-popup__image')
const galleryPopupCaption = galleryPopup.querySelector('.gallery-popup__image-caption')

export const createNewGalleryItem = ({ name, link, id}) => {
    const newItem = galleryItemTemplate.querySelector('.element').cloneNode(true)

    const newItemImage = newItem.querySelector('.element__image')
    newItemImage.setAttribute('src', link)
    newItemImage.setAttribute('alt', name)
    newItem.id = id

    const newItemName = newItem.querySelector('.element__name')
    newItemName.textContent = name

    const counter = newItem.querySelector('.element__like-counter')
    const likeButton = newItem.querySelector('.element__like-button')
    likeButton.addEventListener('click', (e) => {
        if(e.target.classList.contains('element__like-button_active')) {
            e.target.classList.remove('element__like-button_active')
            counter.textContent = parseInt(counter.textContent) - 1
            deleteLike(id)
        } else {
            e.target.classList.add('element__like-button_active')
            counter.textContent = parseInt(counter.textContent) + 1
            addLike(id)
        }
    })

    const deleteButton = newItem.querySelector('.element__delete-button')
    deleteButton.addEventListener('click', (e) => {
        const currentCard = e.target.closest('.element')
        deletePopup.id = currentCard.id

        openPopup(deletePopup)
    })

    newItemImage.addEventListener('click', (e) => {
        galleryPopupImage.setAttribute('src', link)
        galleryPopupImage.setAttribute('alt', name)
        galleryPopupCaption.textContent = name

        openPopup(galleryPopup)
    })

    return newItem
}

export const addNewGalleryItem = (card) => {
    gallery.prepend(card)
}

const setInitialLikes = (cardData, cardElement) => {
    const counter = cardElement.querySelector('.element__like-counter')
    counter.textContent = cardData.likes.length
}

const setDeleteButton = (cardData, cardElement) => {
    const deleteButton = cardElement.querySelector('.element__delete-button')
    if(cardData.owner._id === 'b0b46485c6b47283aa7072c3') {
        deleteButton.removeAttribute('disabled')
    }
}

const setLiked = (cardData, cardElement) => {
    const likeButton = cardElement.querySelector('.element__like-button')
    if(cardData.likes.find(owner => owner._id === 'b0b46485c6b47283aa7072c3')) {
        likeButton.classList.add('element__like-button_active')
    }
}
 
export const renderGalleryItems = () => {
    getInitialCards()
    .then(cards => {
        cards.forEach(card => {
            const name = card.name
            const link = card.link
            const id = card._id
            const newCard = createNewGalleryItem({name, link, id})
            setInitialLikes(card, newCard)
            setDeleteButton(card, newCard)
            setLiked(card, newCard)
            addNewGalleryItem(newCard)
        })
    })
    
}