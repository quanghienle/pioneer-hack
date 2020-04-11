import React from "react";
import RTCMesh from 'react-rtc-real';
require('react-rtc-real/assets/index.css');

class FocusPage extends React.Component {
  state = {
    data: null,
  };


  render() {
    return <RTCMesh URL="wss://d5075207.ngrok.io"/>;
  }
}

export default FocusPage;
