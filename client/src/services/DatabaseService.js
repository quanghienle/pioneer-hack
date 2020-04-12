import fire from "../firebase";
import firebase from "firebase";

import { Follow, LiveSession, User } from "../models/models";

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

  async getRunningSessions() {
    const allSess = [];
    const sess = await this.db.collection("sessions").get();

    sess.forEach((doc) => {
      allSess.push({ id: doc.id, data: doc.data() });
    });

    const runningSess = allSess.filter(s => s.data.status==='running')
    return runningSess;
  }

  async getUserInfo(uid) {
    const userRef = this.db.collection("users").doc(uid);
    try {
      const doc = await userRef.get();
      return doc.data();
    } catch(err) {
      console.console(err);
    }
  }

  updateUserInfo(userInfo) {
    return;
  }

  async createUser(uid, displayName, email) {
    try {
      await this.db.collection("users").doc(uid).set({
        name: displayName,
        email,
        numFollowers: 0,
        numFollowings: 0,
      });
    } catch(err) {
      console.log(err)
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
        status: "running",
      });
      return sessionRef.id;
    } catch (err) {
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
      const sessionRef = await this.db.collection("sessions").doc(sessionId).set(
        {
          completed,
          status: "finished",
        },
        { merge: true }
      );
      console.log("Progress saved");
    } catch (err) {
      console.log(err);
      console.log("Unable to create a new session.");
    }
  }

  toggleLike(uid, sessionId) {

  }
}
