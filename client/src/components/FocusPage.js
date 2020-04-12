import React from "react";
import { OTSession, OTPublisher, OTStreams, OTSubscriber, createSession } from "opentok-react";

const API_KEY = "46669582";
const SESSION_ID = "2_MX40NjY2OTU4Mn5-MTU4NjY1NDY0NjI3MH5HbkJDWVJiZWp2UXNvTDNLK3FiT1A2TWR-fg";
const TOKEN = "T1==cGFydG5lcl9pZD00NjY2OTU4MiZzaWc9ZjdjYzMzZjE3MzE5N2IyZTBjOTZlY2M5NzM1MjUyMjlhMjAxNzMzYjpzZXNzaW9uX2lkPTJfTVg0ME5qWTJPVFU0TW41LU1UVTROalkxTkRZME5qSTNNSDVIYmtKRFdWSmlaV3AyVVhOdlRETkxLM0ZpVDFBMlRXUi1mZyZjcmVhdGVfdGltZT0xNTg2NjU0NjkzJm5vbmNlPTAuNzY3MzcyMTIzNTU1NTU5MSZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTg2NjU4MjkyJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";

class FocusPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { streams: [] };
  }

  componentWillMount() {
    this.sessionHelper = createSession({
      apiKey: API_KEY,
      sessionId: SESSION_ID,
      token: TOKEN,
      onStreamsUpdated: (streams) => {
        this.setState({ streams });
      },
    });
  }

  componentWillUnmount() {
    this.sessionHelper.disconnect();
  }

  render() {
    return (
      <div>
        <OTPublisher session={this.sessionHelper.session} />

        {this.state.streams.map((stream) => {
          return (
            <OTSubscriber 
              key={stream.id} 
              session={this.sessionHelper.session} 
              stream={stream} />
          );
        })}
      </div>
    );
  }
}

export default FocusPage;
