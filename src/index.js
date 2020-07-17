// Константы

import "./style.css";
import Api from '../modules/Api.js';
import Card from '../modules/Card.js';
import CardList from '../modules/CardList.js';
import FormValidator from '../modules/FormValidator.js';
import Popup from '../modules/Popup.js';
import UserInfo from '../modules/UserInfo.js';

const placesList = document.querySelector('.places-list');

const myId = {
  headers: {
    authorization: 'baeab0e2-f3de-4ee4-92e5-286a09106ee3'
  }
};

const userAvatar = document.querySelector('.user-info__photo');
userAvatar.style.backgroundImage = "url('./images/avatar.jpg')";

const userInfoName = document.querySelector('.user-info__name');
const userInfoJob = document.querySelector('.user-info__job');
const editProfileButton = document.querySelector('.user-info__edit-button');
const addCardButton = document.querySelector('.user-info__button');
const popupAddCard = new Popup (document.querySelector('.popup_type_add-card'));
const popupEditProfile = new Popup (document.querySelector('.popup_type_edit-profile'));

const profileValidator = new FormValidator(popupEditProfile.form, popupEditProfile.form.name, popupEditProfile.form.job);
profileValidator.setEventListeners();

const cardValidator = new FormValidator(popupAddCard.form, popupAddCard.form.name, popupAddCard.form.link);
cardValidator.setEventListeners();

const getUserInfo = new Api((process.env.NODE_ENV === 'production' ? 'https://praktikum.tk/cohort11/users/me':'http://praktikum.tk/cohort11/users/me'), myId);

getUserInfo.getTasks().then(res => {
  const userInfo = new UserInfo (userInfoName, userInfoJob, userAvatar);
  userInfo.setUserInfo(res.name, res.about, res.avatar);
});

const getInitialsCards = new Api((process.env.NODE_ENV === 'production' ? 'https://praktikum.tk/cohort11/cards':'http://praktikum.tk/cohort11/cards'), myId);

getInitialsCards.getTasks().then(res => {
  const cardList = new CardList(placesList, res, createCard);
  cardList.render();
});

const patchUserInfo = new Api((process.env.NODE_ENV === 'production' ? 'https://praktikum.tk/cohort11/users/me':'http://praktikum.tk/cohort11/users/me'), myId);

function createCard(name, link) {
  const placeCard = new Card(name, link, increaseImage);

  return placeCard
}

function increaseImage(event) {
  if (event.target.classList.contains('place-card__image')) {
    const body = document.querySelector('body');
    const zoomCard = document.createElement('div');
    const zoomImage = document.createElement('div');
    const closeButton = document.createElement('img');
    const urlValue = event.target.getAttribute('style');

    closeButton.setAttribute('src', './images/close.svg');

    zoomCard.classList.add('zoom-card');
    zoomImage.classList.add('zoom-card__image');
    closeButton.classList.add('zoom-card__close');

    closeButton.addEventListener('click', function(){
      zoomCard.remove();
    });

    zoomImage.setAttribute('style', urlValue);

    zoomImage.appendChild(closeButton);
    zoomCard.appendChild(zoomImage);
    body.appendChild(zoomCard);
  }
};

// Обработчики событый

popupAddCard.form.addEventListener('submit', function(event) {
  event.preventDefault()
  if (popupAddCard.form.checkValidity()) {

    cardList.addCard(popupAddCard.form.name.value, popupAddCard.form.link.value);
    popupAddCard.form.reset();
    popupAddCard.button.classList.remove('popup__button_enable');
    popupAddCard.close();
  }
});

addCardButton.addEventListener('click', function () {
  popupAddCard.open();
  popupAddCard.setEventListeners();
});

editProfileButton.addEventListener('click', function () {
  popupEditProfile.open();
  popupEditProfile.setEventListeners();
});

popupEditProfile.form.addEventListener('submit', function(event) {
  event.preventDefault();
  if (popupEditProfile.form.checkValidity()) {
    patchUserInfo.createTask(popupEditProfile.form.name.value, popupEditProfile.form.job.value);
    getUserInfo.getTasks().then(res => {
      const userInfo = new UserInfo (userInfoName, userInfoJob, userAvatar);
      userInfo.setUserInfo(res.name, res.about, res.avatar);
    });
    popupEditProfile.close();
  }
});