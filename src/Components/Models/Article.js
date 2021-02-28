import React, { useState, useEffect } from 'react'
import VideoChatSessionModel from '../../ApiManager/VideoChatSessionModel'
import Constants from '../../Config/Constants'
import Summary from './Summary'
import styled from "styled-components";
import { useRef } from 'react/cjs/react.development';
import Peer from 'simple-peer'
import io from "socket.io-client";
import PromptPopUp from './PromptPopUp';

const Article = ({ props }) => {

    const [token, settoken] = useState(null);
    const [channel, setchannel] = useState(null)
    const [stream, setStream] = useState()
    const [isDirty, setDirty] = useState(true)
    const [room, setRoom] = useState(props.id)
    const [callerSignal, setCallerSignal] = useState();
    const partnerVideo = React.useRef()
    const rtcPeerConnections = {}

    const EndPoint = Constants.chatServer
    const socket = io.connect(EndPoint)

    let rc
    const iceServers = {
        iceServers: [
            {
                "urls": "stun:stun.l.google.com:19302",
            }
        ],
    }

    useEffect(() => {
        console.log("================")
        socket.emit("register as viewer", room);

        socket.on("offer", (id, description) => {
            console.log("Get offer from broadcaster")
            rtcPeerConnections[id] = new RTCPeerConnection(iceServers)
            rtcPeerConnections[id]
                .setRemoteDescription(description)
                .then(() => rtcPeerConnections[id].createAnswer())
                .then(answer => rtcPeerConnections[id].setLocalDescription(answer))
                .then(() => {
                    socket.emit("answer", room, id, rtcPeerConnections[id].localDescription)
                })
            rtcPeerConnections[id].ontrack = e => {
                console.log(e.streams[0])
                document.querySelector("video").srcObject = e.streams[0]
                // var video = document.querySelector('video');
                // video.srcObject = e.streams[0];
                // video.onloadedmetadata = function(e) {
                //     video.play();
                // };
            }
            rtcPeerConnections[id].onicecandidate = e => {
                if (e.candidate) {
                    socket.emit("candidate", id, e.candidate)
                }
            }
        })

        socket.on('candidate', (id, candidate) => {
            rtcPeerConnections[id].addIceCandidate(new RTCIceCandidate(candidate))
                .catch(e => console.error(e))
        })

        socket.on("broadcaster", () => {
            socket.emit("watcher", room)
        })

        // socket.on('disconnectPeer', (id) => {
        //     console.log("peer connection close")
        //     socket.close();
        //     rc.close()
        //     //delete peerConnections[id]
        // })

    }, [room])

    return (
        <article className="vertical-item post format-video with_background">
            <div className="entry-thumbnail">
                {/* <div className="entry-meta-corner">
                    <span className="date">
                        <time dateTime="2016-08-01T15:05:23+00:00" className="entry-date">
                            <strong>{new Date().getDate()}</strong>
                            {Constants.monthNames[new Date().getMonth()]}
                        </time>
                    </span>

                    <span className="comments-link">
                        <a href="#">
                            <i className="rt-icon2-bubble highlight"></i> 425
                        </a>
                    </span>
                </div> */}
                <div className="embed-responsive embed-responsive-3by2">
                    {
                        (token) ? <Call token={token} channel={channel} /> : <img src={props.profilePicture} alt={props.name} />
                    }
                    <video id="viewer" autoPlay></video>

                </div>
            </div>

            <PromptPopUp isDirtystatus={isDirty} socket={socket} room={room} />

        </article>
    )
}

export default Article
