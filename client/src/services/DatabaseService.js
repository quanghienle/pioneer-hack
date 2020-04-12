import fire from '../firebase';
import firebase from 'firebase';

import { Follow, LiveSession, User } from '../models/models';

export default class DataBaseService {
  constructor() {
    this.db = fire.firestore();
    this.activeSession = null;
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
    const userRef = this.db.collection("users").doc(uid);
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
      return userRef.id;
    } catch(err) {
      console.log("Error creating new user")
    }
  }

  async startSession(uid, duration, restDuration) {
    try {
      const sessionRef = await this.db.collection("sessions").add({
        streamer: uid,
        startTime: firebase.firestore.Timestamp.fromDate(new Date()),
        duration,
        restDuration,
        watchSessions: [],
        views: 0,
        likes: 0,
        completed: false,
        status: "running"
      });
      this.activeSession = sessionRef.id;
    } catch(err) {
      console.log(err);
      console.log("Unable to create a new session.");
    }
  }

  /**
   * Finish a session (complete or not) 
   * @param {boolean} complete 
   */
  async finishSession(sessionId, completed) {
    try {
      const sessionRef = await this.db.collection("sessions").doc(sessionId).set({
        completed,
        status: "finished"
      });
      return sessionRef.id;
    } catch(err) {
      console.log(err);
      console.log("Unable to create a new session.");
    }
    console.log("Progress saved")
  }

  toggleLike(uid, sessionId) {

  }
}