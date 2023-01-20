const showError = (form, input, errMessage, classConfig) => {
    input.classList.add(classConfig.inputErrorClass)
    const inputError = form.querySelector(`.${input.id}-error`)
    inputError.textContent = errMessage
    inputError.classList.add(classConfig.errorClass);
}

const hideError = (form, input, classConfig) => {
    input.classList.remove(classConfig.inputErrorClass)
    const inputError = form.querySelector(`.${input.id}-error`)
    inputError.classList.remove(classConfig.errorClass);
    inputError.textContent = ''
}

const checkInputValidity = (form, input, classConfig) => {
    if (!input.validity.valid) {
      showError(form, input, input.validationMessage, classConfig);
    } else {
      hideError(form, input, classConfig);
    }
}

const hasInvalidInput = (form, classConfig) => {
    const inputList = Array.from(form.querySelectorAll(classConfig.inputSelector))
    return inputList.some(input => !input.validity.valid)
}

const toggleButtonState = (form, button, inactiveButtonClass, classConfig) => {
    if (hasInvalidInput(form, classConfig)) {
      button.classList.add(inactiveButtonClass)
      button.setAttribute('disabled', '')
    } else {
      button.classList.remove(inactiveButtonClass)
      button.removeAttribute('disabled', '')
    }
}

const setEventListeners = (form, classConfig, button) => {
    const inputList = Array.from(form.querySelectorAll(classConfig.inputSelector))
    toggleButtonState(form, button, classConfig.inactiveButtonClass, classConfig)
    inputList.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidity(form, input, classConfig)
            toggleButtonState(form, button, classConfig.inactiveButtonClass, classConfig)
        })
    })
}

export const enableValidation = (classConfig) => {
    const formsList = Array.from(document.querySelectorAll(classConfig.formSelector))
    formsList.forEach((form) => {
        const button = form.querySelector(classConfig.submitButtonSelector)
        form.addEventListener('submit', (e) => {
            e.preventDefault()
        })
        form.addEventListener('reset', () => {
            setTimeout(() => {
                toggleButtonState(form, button, classConfig.inactiveButtonClass, classConfig)
            }, 0)
        })
        setEventListeners(form, classConfig, button)
    })
}