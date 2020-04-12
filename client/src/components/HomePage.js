import React from "react";
import Webcam from "react-webcam";
import Switch from "@material-ui/core/Switch";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import DataBaseService from "../services/DatabaseService";
import { OTSession, OTPublisher, OTStreams, OTSubscriber, createSession } from "opentok-react";
import OpenTok from "opentok";

const API_KEY = '46669582';
const API_SECRET = '37f03285211c392e937134e247402affbc997ace';
var opentok = new OpenTok(API_KEY, API_SECRET);

export default function HomePage() {
  const [camera, setCamera] = React.useState(false);
  const [intervalID, setIntervalID] = React.useState(null);
  const [timeLeft, setTimeLeft] = React.useState(90*60000);
  const [sessionId, setSessionId] = React.useState(null);
  const dbService = new DataBaseService();

  var [PublisherSessionId, setPublisherSessionId] = React.useState(null);
  var [PublisherToken, setPublisherToken] = React.useState(null);

  const triggerTimer = () => {
    let startTime = timeLeft
    const inter = setInterval(() => {
        startTime -= 1000
      setTimeLeft(startTime);
    }, 1000);
    setIntervalID(inter)
  };

  const onStream = async () => {
    setCamera(!camera);
    setSessionId(await opentok.createSession({}, function(error, session) {
                          if (error) {
                            console.log("Error creating session:", error)
                          } else {
                            PublisherSessionId = session.sessionId;
                            //  Use the role value appropriate for the user:
                            var tokenOptions = {};
                            tokenOptions.role = "publisher";
                            tokenOptions.data = "username=bob";
                            // Generate a token.
                            PublisherToken = opentok.generateToken(PublisherSessionId, tokenOptions);
                          }
                        }));
  }

  const onStart = async () => {
    triggerTimer();
    setSessionId(await dbService.startSession('gLee2t2VQm6agqSrlQjI', 3600, 300));
  }


  const onExit = () => {
    dbService.finishSession(sessionId, true);
    clearInterval(intervalID) 
  }

  const formatTime = () => {
    const formatDigits = (myNumber) => ("0" + myNumber).slice(-2);
    const m = formatDigits(Math.floor(timeLeft / 1000 / 60));
    const s = formatDigits(Math.floor((timeLeft / 1000) % 60));
    return m + " : " + s
  };

  return (
    <div>
      {/* <FormControlLabel
        control={
          <Switch
            checked={camera}
            onChange={() => setCamera(!camera)}
            color="primary"
            name="Webcam"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        }
        label="Show Camera"
      /> */}
      <div style={{ textAlign: "center" }}>{camera ? <Webcam width="60%" /> : null}</div>

      <div style={{ textAlign: "center", fontSize: "50px", height: "150px", lineHeight: "150px" }}>
        {timeLeft ? formatTime() : null}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "0 auto",
          justifyContent: "space-around",
          maxWidth: 600,
        }}
      >
        <Button variant="contained" size="large" color="primary" onClick={onStream}>
          Stream
        </Button>
        <Button variant="contained" size="large" color="primary">
          Track
        </Button>
        <Button variant="contained" size="large" color="primary" onClick={onStart}>
          Start
        </Button>
        <Button variant="contained" size="large" color="primary" onClick={onExit}>
          Exit
        </Button>
      </div>
    </div>
  );
}
