import { openPopup } from "./popup"

const gallery = document.querySelector('.elements__list')
const galleryItemTemplate = document.querySelector('#gallery-item').content

const galleryPopup = document.querySelector('.gallery-popup')
const galleryPopupImage = galleryPopup.querySelector('.gallery-popup__image')
const galleryPopupCaption = galleryPopup.querySelector('.gallery-popup__image-caption')

export const createNewGalleryItem = ({ name, link }) => {
    const newItem = galleryItemTemplate.querySelector('.element').cloneNode(true)

    const newItemImage = newItem.querySelector('.element__image')
    newItemImage.setAttribute('src', link)
    newItemImage.setAttribute('alt', name)

    const newItemName = newItem.querySelector('.element__name')
    newItemName.textContent = name

    const likeButton = newItem.querySelector('.element__like-button')
    likeButton.addEventListener('click', (e) => {
        e.target.classList.toggle('element__like-button_active')
    })

    const deleteButton = newItem.querySelector('.element__delete-button')
    deleteButton.addEventListener('click', (e) => {
        e.target.closest('.element').remove()
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
 
export const renderGalleryItems = (arr) => {
    arr.forEach(item => {
        const newCard = createNewGalleryItem(item)
        addNewGalleryItem(newCard)
    })
}