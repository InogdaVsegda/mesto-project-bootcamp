import { getProfileData } from "./api";

const profileName = document.querySelector('.profile__name')
const profileDescription = document.querySelector('.profile__description')
const profileImage = document.querySelector('.profile__avatar')

const setProfileData = () => {
    getProfileData().then(data => {
        profileName.textContent = data.name
        profileDescription.textContent = data.about
        profileImage.src = data.avatar
    })
}

export { setProfileData }