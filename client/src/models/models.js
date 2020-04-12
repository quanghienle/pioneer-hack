export class User {
  constructor(uid, name, numFollowers=0, numFollowings=0) {
    this.uid = uid;
    this.name = name;
    this.numFollowers = numFollowers;
    this.numFollowings = numFollowings;
  }

  getUid() {
    return this.uid;
  }

  getName() {
    return this.name;
  }
}

export class LiveSession {
  constructor(sessionId, streamer, startTime, duration, restDuration=0, watchSessions=[], views=0, likes=0, dislikes=0, completed=false) {
    this.sessionId = sessionId;
    this.streamer = streamer;
    this.startTime = startTime;
    this.duration = duration;
    this.watchSessions = watchSessions;
    this.restDuration = restDuration;
    this.views = views;
    this.likes = likes;
    this.dislikes = dislikes;
    this.completed = completed;
  }
}

export class Follow {
  constructor(fromUid, toUid) {
    this.fromUid = fromUid;
    this.toUid = toUid;
  }
}

export class Like {
  constructor(uid, sessionId) {
    this.uid = uid;
    this.sessionId = sessionId;
  }
}