import './pages/index.css';

import { initialCards } from './components/cardsData.js'
import { enableValidation } from './components/validation.js'
import { renderGalleryItems } from './components/card.js'
import { setPopupListeners } from './components/popup.js'


renderGalleryItems(initialCards)

setPopupListeners()

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_inactive',
    inputErrorClass: 'form__item_type_error',
    errorClass: 'form__item-error_active'
  })


