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
    this.button.addEventListener('click', () => {
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
    });
  }

  /* addListenerClick(fn) {
    this.obj.addEventListener('click', fn);
  }

  addListenerLoad(fn, el) {
    this.xhr.addEventListener('load', function da() {
      fn(el);
      this.removeEventListener('load', da);
    });
  }

  removeListenerLoad(fn, el) {
    this.xhr.removeEventListener('load', () => fn(el));
  }

  addUser(e) {
    if (e.target.classList.contains('continueButton')) {
      this.xhr.open('GET', `https://websocket-server-heroku.herokuapp.com/?method=findUser&name=${this.nickNameInput.value}`);
      this.xhr.send();
      this.currentName = this.nickNameInput.value;
      this.addListenerLoad(this.renderUsers);
    }
  }

  renderUsers() {
    if (this.xhr.status >= 200 && this.xhr.status < 300) {
      const result = JSON.parse(this.xhr.responseText);
      console.log(result);
      if (result) {
        this.chatWindow.style.display = 'flex';
        for (const i of result) {
          if (i.name === this.currentName) {
            this.listUsers.insertAdjacentHTML('afterbegin',
              `<div class="user">
                <div class="avatar"></div>
                <div class="nickname">You</div>
              </div>`);
          } else {
            this.listUsers.insertAdjacentHTML('afterbegin',
              `<div class="user">
            <div class="avatar"></div>
            <div class="nickname">${i.name}</div>
          </div>`);
          }
        }
        this.modal.style.display = 'none';
      } else {
        alert('Такой пользователь уже авторизирован');
      }
    }
  }

  sendMessage() {
    this.inputField.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        this.ws.send(JSON.stringify(
        { // eslint-disable-line
          name: this.currentName,// eslint-disable-line
          time: time(),// eslint-disable-line
          message: this.inputField.value// eslint-disable-line
        }));// eslint-disable-line
        this.inputField.value = '';
      }
    });
  }

  onMsg() {
    this.ws.onmessage = (e) => {
      this.renderMessages(e.data);
    };
  }

  renderMessages(data) {
    const result = JSON.parse(data);
    console.log(result);
    this.messages.innerHTML = '';
    for (const i of result) {
      if (i.name === this.currentName) {
        this.messages.insertAdjacentHTML('beforeend',
          `<div class="message true">
          <div class="attributes">
            <span class="nicknameChat">You</span>
            <span class="time">${i.time}</span>
          </div>
          <span class="record">${i.message}</span>
        </div>`);
      } else {
        this.messages.insertAdjacentHTML('beforeend',
          `<div class="message">
          <div class="attributes">
            <span class="nicknameChat">${i.name}</span>
            <span class="time">${i.time}</span>
          </div>
          <span class="record">${i.message}</span>
        </div>`);
      }
    }
  }

  onClose() {
    window.addEventListener('beforeunload', () => {
      this.ws.close(1000);
      navigator.sendBeacon('https://websocket-server-heroku.herokuapp.com/?method=deleteUser', JSON.stringify(this.currentName));
    });
  } */
}
