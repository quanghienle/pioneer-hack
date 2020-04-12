import fire from '../firebase';
import { Follow, LiveSession, User } from '../models/models';

export class DataBaseService {
  constructor() {
    this.db = fire.firestore();
  }

  saveSession(session) {
    return;
  }

  getSession(sessionId) {
    return;
  }

  getUserInfo(uid) {
    return
  }

  updateUserInfo(userInfo) {
    return;
  }

  createUser(userInfo) {
    return;
  }

  startSession() {

  }

  pauseSession(sessionId) {

  }

  /**
   * Finish a session (complete or not) 
   * @param {boolean} complete 
   */
  finishSession(sessionId, complete) {

  }

  toggleLike(uid, sessionId) {

  }
}