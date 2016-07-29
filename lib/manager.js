import {
  NativeModules
} from 'react-native';

let EvernoteModule = NativeModules.Evernote;

export default class EvernoteManager {

  constructor(key, secret, sandboxMode = true) {
    this._key         = key
    this._secret      = secret
    this._sandboxMode = sandboxMode
    this._isSetup     = false

    this.setup()
  }

  get key () {
    return this._key;
  }

  get secret () {
    return this._secret
  }

  get isInSandboxMode() {
    return this._sandboxMode;
  }

  setup() {
    EvernoteModule.setup(this.key, this.secret, this.isInSandboxMode);
    this._isSetup = true
  }

  get isSetup () {
    return this._isSetup;
  }

  status() {
    return new Promise((resolve, reject) => {
      if (!this.isSetup) {
        reject("Evernote Is Not Setup Yet.");
        return;
      }

      EvernoteModule.status(status => {
        if (status === "authenticated") {
          resolve({ loggedIn: true });
          return;
        }
        reject("Not logged in");
      });
    });
  }

  accountDetails() {
    return new Promise((resolve, reject) => {
      if (!this.isSetup) {
        reject("Evernote Is Not Setup Yet.");
        return;
      }

      EvernoteModule.account(details => {
        if (details && details.name) {
          resolve({ name: details.name });
          return;
        }
        reject("Could not fetch account details");
      });
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      if (!this.isSetup) {
        reject("Evernote Is Not Setup Yet.");
      }

      EvernoteModule.logout(status => {
        if (status === "logout_successful") {
          resolve({ loggedOut: true });
          return;
        }
        reject("Logout failed");
      });
    });
  }

  login() {
    return new Promise((resolve, reject) => {
      if (!this.isSetup) {
        reject("Evernote Is Not Setup Yet.");
      }

      EvernoteModule.login((status, reason) => {
        if (status === "login_successful") {
          resolve({ loggedIn: true });
          return;
        }
        reject(`Login failed: ${reason}`);
      });
    });
  }

}
