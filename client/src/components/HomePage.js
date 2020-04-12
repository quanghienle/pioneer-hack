import React from "react";
import Webcam from "react-webcam";
import Switch from "@material-ui/core/Switch";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import DataBaseService from "../services/DatabaseService";
import { OT, OTPublisher, OTStreams, OTSubscriber, createSession } from "opentok-react";
import OpentokService from "../services/OpentokService";
import AuthService from "../services/AuthService";

// import "./HomePage.css"
import { Config } from "./tokConfig";

const { API_KEY, API_SECRET } = Config;

export default function HomePage() {
  const [camera, setCamera] = React.useState(false);
  const [intervalID, setIntervalID] = React.useState(null);
  const [timeStudied, setTimeStudied] = React.useState(0);
  const [sessionId, setSessionId] = React.useState(null);
  const [sessionHelper, setSessonHelper] = React.useState({ session: null });
  const [streams, setStreams] = React.useState([]);
  const dbService = new DataBaseService();
  const otService = new OpentokService();
  const authService = new AuthService();
  const [active, setActive] = React.useState(false);

  //   var [PublisherSessionId, setPublisherSessionId] = React.useState(null);
  //   var [PublisherToken, setPublisherToken] = React.useState(null);

  const triggerTimer = () => {
    let startTime = 0;
    const inter = setInterval(() => {
      startTime += 1000;
      setTimeStudied(startTime);
    }, 1000);
    setIntervalID(inter);
  };

  //   const createSessionID = async () => {
  //     let sessionId = null;
  //     const res = await callBackendAPI()

  //     console.log(res.sessionId)
  //   };

//   const callBackendAPI = async () => {
//     const response = await fetch("/sessionId");
//     const body = await response.json();

//     if (response.status !== 200) {
//       throw Error(body.message);
//     }
//     return body;
//   };

  const onStream = async () => {
    setActive(true);
    const userInfo = await authService.getCurrentUserInfo();
    const { sessionId, token } = await otService.createSession();

    const helper = createSession({
      apiKey: API_KEY,
      sessionId: sessionId,
      token: token,
      onStreamsUpdated: (strms) => {
        setStreams({ strms });
      },
    });
    // const publisher = OT.initPublisher("myPublisherElementId", { width: 400, height: 300 });
    // helper.properties = { width: 400, height: 300 } 
    setSessonHelper(helper);
    setCamera(true);
    triggerTimer();
    
    await dbService.startSession(userInfo.uid, sessionId, token);
    setSessionId(sessionId);
  };

  const onExit = () => {
    dbService.finishSession(sessionId, true);
    clearInterval(intervalID);
    setActive(false);
    setCamera(false);
  };

  const formatTime = () => {
    const formatDigits = (myNumber) => ("0" + myNumber).slice(-2);
    const m = formatDigits(Math.floor(timeStudied / 1000 / 60));
    const s = formatDigits(Math.floor((timeStudied / 1000) % 60));
    return m + " : " + s;
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", height: "300px" }}>
        {camera ? (
          <OTPublisher session={sessionHelper.session} properties={{ width: 150, height: 150 }} />
        ) : null}
      </div>

      <div
        style={{
          textAlign: "center",
          fontSize: "50px",
          height: "150px",
          lineHeight: "150px",
        }}
      >
        {timeStudied ? formatTime() : null}
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
        <Button variant="contained" size="large" color="primary" onClick={onStream} disabled={active}>
          Stream {camera ? "OFF" : "ON"}
        </Button>
        <Button variant="contained" size="large" color="primary">
          Track
        </Button>
        <Button variant="contained" size="large" color="primary" onClick={onExit}>
          Exit
        </Button>
      </div>
    </div>
  );
}
