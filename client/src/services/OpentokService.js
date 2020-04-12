import OpenTok from 'opentok';
import { Config } from "../components/tokConfig";

const { API_KEY, API_SECRET } = Config;

export default class OpenTokService {
  constructor() {
    this.ot = new OpenTok(API_KEY, API_SECRET);
  }  

  async createSession() {
    return new Promise((resolve, reject) => {
      this.ot.createSession({ mediaMode: "routed" }, (error, session) => {
        if (error) {
          console.log("Error creating session:", error);
          reject(error);
        } else {
          const sessionId = session.sessionId;
          const token = this.ot.generateToken(sessionId, {role: "publisher"});
          resolve({sessionId, token});
        }
      });
    });
  }
}
