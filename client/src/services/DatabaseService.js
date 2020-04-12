import fire from '../firebase';

import { Follow, LiveSession, User } from '../models/models';

export class DataBaseService {
  constructor() {
    this.db = fire.firestore();
  }

  async saveSession(session) {
    return;
  }

  async getSession(sessionId) {
    return;
  }

  async getAllSessions() {

  }

  async getUserInfo(uid) {
    const userRef = db.collection("users").doc(uid);
    try {
      const userInfo = await userRef.get();
      return userInfo;
    } catch(err) {
      console.err("Error getting user info!");
    }
  }

  updateUserInfo(userInfo) {
    return;
  }

  async createUser(username) {
    try {
      const userRef = await this.db.collection("users").add({
        username,
        numFollowers: 0,
        numFollowings: 0 
      });
    } catch(err) {
      console.log("Error creating new user")
    }
    
    return userRef.id;
  }

  async startSession(uid, duration, restDuration) {
    try {
      const sessionRef = await this.db.collection("sessions").add({
        streamer: uid,
        startTime: db.Timestamp.fromDate(new Date()),
        duration,
        restDuration,
        watchSessions: [],
        views: 0,
        likes: 0,
        completed: false,
        status: "running"
      });
      return sessionRef.id;
    } catch(err) {
      console.err("Unable to create a new session.");
    }
  }

  async pauseSession(sessionId) {

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