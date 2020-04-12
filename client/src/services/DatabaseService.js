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
    const runningSess = [];
    const sess = await this.db.collection("sessions").where("status", "==", "running").get();

    sess.forEach((doc) => {
      runningSess.push({ id: doc.id, data: doc.data() });
    });
    return runningSess;
  }

  async getUserInfo(uid) {
    console.log(uid);
    try {
      const userRef = this.db.collection("users").doc(uid);
      const doc = await userRef.get();
      return {uid, ...doc.data()};
    } catch(err) {
      console.log(err);
    }
  }

  subscribeRunningSessions(onUpdate) {
    this.db.collection("sessions").where("status", "==", "running")
    .onSnapshot(function(querySnapshot) {
      const runningSess = [];
      querySnapshot.forEach(s => {
        runningSess.push({ id: s.id, ...s.data() });
      });
      console.log("Running session update");
      onUpdate(runningSess);
    });

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

  async startSession(uid, sessionId, token, title="Focus") {
    try {
      const sessionRef = await this.db.collection("sessions").doc(sessionId).set({
        streamer: uid,
        startTime: firebase.firestore.Timestamp.fromDate(new Date()),
        title,
        token: token,
        endTime: null,
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
          startTime: firebase.firestore.Timestamp.fromDate(new Date()),
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
