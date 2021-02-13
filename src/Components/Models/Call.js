import React, { useState, useEffect } from 'react'
import AgoraRTC from 'agora-rtc-sdk'
import Constants from '../../Config/Constants'

function Call(props) {

    const [channel, setchannel] = useState('dc10')
    const [remoteStreams, setremoteStreams] = useState({})

    let client = AgoraRTC.createClient({ mode: "live", codec: "h264" });

    const USER_ID = Math.floor(Math.random() * 1000000001);

    const localStream = AgoraRTC.createStream({
        streamID: USER_ID,
        audio: true,
        video: true,
        screen: false
    });

    useEffect(() => {
        initLocalStream()
        initClient();
    }, [])

    useEffect(() => {
        joinChannel();
    }, [channel])

    const initClient = () => {
        client.init(
          Constants.AgoraKeys.APPID,
          function() {
            console.log("AgoraRTC client initialized");
          },
          function(err) {
            console.log("AgoraRTC client init failed", err);
          }
        );

        subscribeToClient();
      };

    const subscribeToClient = () => {
        client.on("stream-added", onStreamAdded);
        // client.on("stream-subscribed", onRemoteClientAdded);
    
        // client.on("stream-removed", onStreamRemoved);
    
        // client.on("peer-leave", onPeerLeave);
    };
      
    const initLocalStream = () => {
        localStream.init(
          function() {
            console.log("getUserMedia successfully");
            localStream.play("agora_local");
          },
          function(err) {
            console.log("getUserMedia failed", err);
          }
        );
    };

    const joinChannel = () => {
        client.join(
          null,
          channel,
          USER_ID,
          function(uid) {
            console.log("User " + uid + " join channel successfully");
            client.publish(localStream, function(err) {
              console.log("Publish local stream error: " + err);
            });
    
            client.on("stream-published", function(evt) {
              console.log("Publish local stream successfully");
            });
          },
          function(err) {
            console.log("Join channel failed", err);
          }
        );
      };

    const onStreamAdded = evt => {
      let stream = evt.stream;
      console.log("New stream added: " + stream.getId());

      let onGoingStream = {};
      onGoingStream[stream.getId()] = stream;

      setremoteStreams(onGoingStream)
    };

    return (
        <div id="agora_local" style={{ width: "400px", height: "400px" }} />  
    )
}

export default Call
