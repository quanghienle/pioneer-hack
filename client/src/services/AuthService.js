import fire from '../firebase';
import DataBaseService from './DatabaseService';

export default class AuthService {
  constructor() {
    this.auth = fire.auth();
    this.dbService = new DataBaseService();
  }

  async signUp(displayName, email, password) {
    try {
      await this.auth.createUserWithEmailAndPassword(email, password);
      await this.auth.signInWithEmailAndPassword(email, password);
      const user = this.auth.currentUser;
      await user.updateProfile({displayName});
      await this.dbService.createUser(user.uid, displayName, email);
    } catch (err) {
      console.log(err);
    }
  }

  async signIn(email, password) {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
      return await this.getCurrentUserInfo();
    } catch(error) {
      console.log(error);
    }
  }

  async getCurrentUserInfo() {
    try {
      const { uid } = this.auth.currentUser;
      console.log(`uid: ${uid}`);
      return await this.dbService.getUserInfo(uid);
    } catch(error) {
      console.log(error);
    }
  }

  
}
