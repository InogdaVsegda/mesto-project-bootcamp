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

const addClosePopupsListener = () => {
    const popups = Array.from(document.querySelectorAll('.popup'))
    popups.forEach((popup) => {
        popup.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('popup_opened') || e.target.classList.contains('popup__close-button')) {
                closePopup(popup)
            }
        })
    })
}


export { 
    openPopup,
    closePopup,
    addClosePopupsListener
}