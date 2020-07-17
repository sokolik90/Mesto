export default class FormValidator {
    constructor (form, firstInput, secondInput, button) {
      this.form = form;
      this.firstInput = firstInput;
      this.secondInput = secondInput;
      this.button = this.form.querySelector('.button');
    }
    setEventListeners() {
      this.form.addEventListener('input', this.setSubmitButtonState)
      this.firstInput.addEventListener('input', this.checkInputValidity(this.firstInput, this.form.querySelector('.popup__name-error')));
      this.secondInput.addEventListener('input', this.checkInputValidity(this.secondInput, this.form.querySelector('.popup__job-error')));
  
    }
    checkInputValidity(eventTarget, errorMessage) {
  
      return () => {
        if (eventTarget.value.length === 0) {
          eventTarget.setCustomValidity("Это поле обязательно");
          
          } else if ((eventTarget.name !== 'link') && (eventTarget.value.length === 1 || eventTarget.value.length > 30)) {
            eventTarget.setCustomValidity("Не меньше 2 и не больше 30 символов");
            
          
          } else {
            eventTarget.setCustomValidity("");
            
          }
          errorMessage.textContent = eventTarget.validationMessage;
        }
      }
      
    
    setSubmitButtonState() {
      const button = this.querySelector('.popup__button')
      if (this.checkValidity()) {
  
        button.classList.add('popup__button_enable')
      }
      else {
        button.classList.remove('popup__button_enable')
      }
    }
  };