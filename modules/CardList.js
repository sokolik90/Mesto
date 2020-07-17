export default class CardList {
    constructor(container, initialCards, createCard) {
      this.container = container;
      this.cards = initialCards;
      this.createCard = createCard;
    }
    addCard(name, link) {
      const placeCard = this.createCard(name, link)
      const placeCardContainer = placeCard.create();
      placeCard.setEventListeners();
      this.container.appendChild(placeCardContainer);
    }
    render() {
      this.cards.forEach((item) => {
        this.addCard(item.name, item.link)
      });
    }
  };
