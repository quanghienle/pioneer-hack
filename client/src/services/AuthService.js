import fire from '../firebase';

export class AuthService {
  constructor() {
    this.auth = fire.auth();
  }

  signUp(username, password) {
    return;
  }

  signIn(username, password) {
    return;
  }
}