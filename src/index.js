import './pages/index.css';

import { initialCards } from './components/cardsData.js'
import { enableValidation } from './components/validation.js'
import { renderGalleryItems } from './components/cardsServer.js'
import { setPopupListeners } from './components/popup.js'
import { setProfileData } from './components/profile';
import {getProfileData} from './components/api.js'

setProfileData()
renderGalleryItems()
setPopupListeners()

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_inactive',
    inputErrorClass: 'form__item_type_error',
    errorClass: 'form__item-error_active'
})


getProfileData()
