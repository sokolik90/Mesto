
export default class Card {
    constructor (name, url, popup) {
      this.name = name;
      this.url = url;
      this.popup = popup;
    }
    create() {
      const placeCard = document.createElement('div');
      const cardImage = document.createElement('div');
      const deleteButton = document.createElement('button');
      const cardDescription = document.createElement('div');
      const cardName = document.createElement('h3');
      const likeButton = document.createElement('button');

      placeCard.classList.add('place-card');
      cardImage.classList.add('place-card__image');
      cardImage.style.backgroundImage = 'url('+this.url+')'
      deleteButton.classList.add('place-card__delete-icon');
      cardDescription.classList.add('place-card__description');
      cardName.classList.add('place-card__name');
      cardName.textContent = this.name;
      likeButton.classList.add('place-card__like-icon');

      cardDescription.appendChild(cardName);
      cardDescription.appendChild(likeButton);
      cardImage.appendChild(deleteButton);
      placeCard.appendChild(cardImage);
      placeCard.appendChild(cardDescription);

      this.placeCard = placeCard;
      return placeCard;
    }
    setEventListeners() {
      this.placeCard.querySelector('.place-card__like-icon').addEventListener('click', this.like);
      this.placeCard.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
      this.placeCard.querySelector('.place-card__image').addEventListener('click', this.popup)
    }
    like(event) {
      event.target.classList.toggle('place-card__like-icon_liked');
    }
    remove(event) {
      event.target.parentNode.parentNode.remove();
    }
  };
