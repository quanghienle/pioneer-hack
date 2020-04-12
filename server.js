const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
var OpenTok = require("opentok");

const API_KEY = "46669682";
const API_SECRET = "67aab82f045a3af3bf1fdb30a1fef58b2a6289ce";

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get("/express_backend", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

app.get("/sessionId", (req, res) => {
  const opentok = new OpenTok(API_KEY, API_SECRET);
  let sessionId = null
  opentok.createSession({ mediaMode: "routed" }, function (error, session) {
    if (error) {
      console.log("Error creating session:", error);

    } else {
      sessionId = session.sessionId;
      token = opentok.generateToken(sessionId, {role: "publisher"});
      console.log(`session ID: ${sessionId} \n token: ${token}`);
      res.send({apiKey: API_KEY, sessionId: sessionId, token: token});
    }
  });
});
