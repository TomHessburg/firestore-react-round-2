import React from "react";
import {
  OTSession,
  OTPublisher,
  OTStreams,
  OTSubscriber,
  createSession
} from "opentok-react";

// const secret = "96a8b7efaea5caf27f436b74bf5a9d4ca5d1586b";

export default class VideoElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = { streams: [] };
  }

  componentWillMount() {
    this.sessionHelper = createSession({
      apiKey: "",
      sessionId: "",
      token: "",
      onStreamsUpdated: streams => {
        this.setState({ streams });
      }
    });
  }

  componentWillUnmount() {
    this.sessionHelper.disconnect();
  }

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <OTPublisher session={this.sessionHelper.session} />

        {this.state.streams.map(stream => {
          return (
            <OTSubscriber
              key={stream.id}
              session={this.sessionHelper.session}
              stream={stream}
            />
          );
        })}
      </div>
    );
  }
}

/*
import React, { useEffect } from "react";

export default function VideoElement(props) {
  useEffect(() => {
    // // set up media stream for video/audio
    // var servers = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
    // var pc = new RTCPeerConnection(servers);
    // pc.onicecandidate = event => console.log(event.candidate);
    // navigator.mediaDevices
    //   .getUserMedia({ audio: true, video: true })
    //   .then(stream => pc.addStream(stream));
    // pc.createOffer().then(offer => pc.setLocalDescription(offer));
    // console.log("worked?");
  }, []);

  const showFriendsFace = () => {
    console.log("showing friends face");
  };

  return (
    <iframe
      src=""
      width="800px"
      height="640px"
      scrolling="auto"
      allow="microphone; camera"
    />
  );
}
*/
