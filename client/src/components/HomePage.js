import React from "react";
import Webcam from "react-webcam";
import Switch from "@material-ui/core/Switch";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

export default function HomePage() {
  const [camera, setCamera] = React.useState(false);
  const [intervalID, setIntervalID] = React.useState(null);
  const [timeLeft, setTimeLeft] = React.useState(90*60000);


  const triggerTimer = () => {
    let startTime = timeLeft
    const inter = setInterval(() => {
        startTime -= 1000
      setTimeLeft(startTime);
    }, 1000);
    setIntervalID(inter)
  };

  const pauseTimer = () => {
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
        <Button variant="contained" size="large" color="primary" onClick={() => setCamera(!camera)}>
          Stream
        </Button>
        <Button variant="contained" size="large" color="primary">
          Track
        </Button>
        <Button variant="contained" size="large" color="primary" onClick={triggerTimer}>
          Start
        </Button>
        <Button variant="contained" size="large" color="primary" onClick={pauseTimer}>
          Pause
        </Button>
      </div>
    </div>
  );
}
