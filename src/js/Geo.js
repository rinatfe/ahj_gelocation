import { time } from './time';
import { validationInput } from './validate';

export default class Geo {
  constructor(obj) {
    this.obj = obj;
    this.geo = navigator.geolocation;
    this.storage = null;
    this.inputField = obj.querySelector('.entry');
    this.messages = obj.querySelector('.messages');
    this.modal = obj.querySelector('.modal');
    this.input = obj.querySelector('.description-input');
    this.button = obj.querySelector('.continueButton');
    this.throw = obj.querySelector('.modal-remove');
    this.okBtn = obj.querySelector('.okBtn');

    this.sendMessage = this.sendMessage.bind(this);
    this.position = this.position.bind(this);
    this.error = this.error.bind(this);
    this.manualCords = this.manualCords.bind(this);
    this.actions = this.actions.bind(this);
  }

  sendMessage() {
    this.inputField.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        if (this.inputField !== '') {
          this.getPosition(this.position, this.error);
        }
      }
    });
  }

  getPosition(arg1, arg2) {
    this.geo.getCurrentPosition(arg1, arg2);
  }

  position(pos) {
    const crd = pos.coords;
    this.messages.insertAdjacentHTML('beforeend',
      `<div class="message">
            <div class="attributes">
              <span class="time">${time()}</span>
            </div>
            <div class="record-container">
              <span class="record">${this.inputField.value}</span>
              <span class="nicknameChat">[${crd.latitude.toFixed(4)}, ${crd.longitude.toFixed(4)}]</span>
            </div>  
          </div>`);
    this.inputField.value = '';
  }

  error(err) {
    console.log(err);
    this.modal.style.display = 'block';
    this.storage = this.inputField.value;
    this.manualCords();
  }

  manualCords() {
    this.button.addEventListener('mouseup', this.actions);
  }

  actions() {
    if (this.input.value !== '') {
      if (validationInput(this.input.value)) {
        this.messages.insertAdjacentHTML('beforeend',
          `<div class="message">
            <div class="attributes">
              <span class="time">${time()}</span>
            </div>
            <div class="record-container">
              <span class="record">${this.storage}</span>
              <span class="nicknameChat">${this.input.value}</span>
            </div>  
          </div>`);
        this.modal.style.display = 'none';
        this.inputField.value = '';
        this.storage = null;
      } else {
        this.throw.style.display = 'block';
        this.okBtn.addEventListener('click', () => {
          this.throw.style.display = 'none';
          this.input.value = '';
        });
      }
    } else {
      this.throw.style.display = 'block';
      this.okBtn.addEventListener('click', () => {
        this.throw.style.display = 'none';
      });
    }
    this.input.value = '';
    this.button.removeEventListener('mouseup', this.actions);
  }
}
