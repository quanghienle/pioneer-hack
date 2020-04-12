import React from "react";
import RTCMesh from 'react-rtc-real';
require('react-rtc-real/assets/index.css');

class FocusPage extends React.Component {
  state = {
    data: null,
  };


  render() {
    return (
      <div>
        <p>Focus Page</p>
      </div>
    );
  }
}

export default FocusPage;
