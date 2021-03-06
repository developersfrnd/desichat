import React, { useState, useEffect } from 'react'
import VideoChatSessionModel from '../../ApiManager/VideoChatSessionModel'
import Constants from '../../Config/Constants'
import Summary from './Summary'
import styled from "styled-components";
import { useRef } from 'react/cjs/react.development';
import Peer from 'simple-peer'
import io from "socket.io-client";
import PromptPopUp from './PromptPopUp';
import { constant } from 'lodash';

const Article = ({ props }) => {

    const [token, settoken] = useState(null);
    const [channel, setchannel] = useState(null)
    const [isDirty, setDirty] = useState(true)
    const [room, setRoom] = useState(props.id)
    const [liveVideo, setliveVideo] = useState(false)
    const [callerSignal, setCallerSignal] = useState();
    const partnerVideo = React.useRef()
    const rtcPeerConnections = {}
    let directpeer
    const EndPoint = Constants.chatServer
    const socket = io.connect(EndPoint, {transports: [ 'websocket' ]})

    let rc
    const iceServers = {
        iceServers: [
            { 
                "urls": [
                        "stun:stun.l.google.com:19302",
                        "stun:stun1.l.google.com:19302",
                        "stun:stun2.l.google.com:19302",
                        "stun:stun3.l.google.com:19302",
                        "stun:stun4.l.google.com:19302"
                ]
            }
        ],
    }
    const viewer = React.useRef()
    const livestream = React.useRef()
    

    useEffect(() => {
        
        socket.emit("register as viewer", room);

        socket.on("offer", (id, description) => {
            console.log("Get offer from broadcaster")
            rtcPeerConnections[id] = new RTCPeerConnection(iceServers)
            rtcPeerConnections[id]
            .setRemoteDescription(description)
            .then(e => console.log('remote description'))
            .then(() => rtcPeerConnections[id].createAnswer()).catch(error => console.log(error))
            .then(answer => rtcPeerConnections[id].setLocalDescription(answer)).catch(error => console.log(error))
            .then(() => {
                socket.emit("answer", room, id, rtcPeerConnections[id].localDescription)
            }).catch(error => console.log(error))
            rtcPeerConnections[id].ontrack = e => {          
                console.log(e.streams[0])
                viewer.current.srcObject = e.streams[0]
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

        socket.on("brodcasterleave", (brodcastersocketid) => {
            if(rtcPeerConnections[brodcastersocketid]){
                rtcPeerConnections[brodcastersocketid].close()
                console.log(`${brodcastersocketid} model  has been left`)
                directpeer.close()
                delete rtcPeerConnections[brodcastersocketid]
                document.getElementById("viewer").srcObject = null
            }
        })
        
    }, [room])


    useEffect(() => {  
        
        socket.on('iniatevideo', (id) => {
            document.getElementById("livevideochat").style.display = 'none'
            document.getElementById("livevideochatmessage").style.display = 'none'
            var constraints = {
                audio: true,
                video: true
            };
            directpeer = new RTCPeerConnection()
            navigator.mediaDevices.getUserMedia({video:{frameRate:24}, audio:true}).then(stream => {
                livestream.current.srcObject = stream           
                //const stream = livestream.current.captureStream();
                console.log(stream)
                stream.getTracks().forEach(track => directpeer.addTrack(track, stream));
            })
            directpeer.onicecandidate = e => {
                if (e.candidate) {
                    socket.emit("directcandidate", id, e.candidate)
                }
            }
            directpeer.onnegotiationneeded = () => {
                directpeer.createOffer()
                .then(offer => directpeer.setLocalDescription(offer)).catch( error => console.log(error))
                .then( () => {
                    console.log("Direct offer genrate "+directpeer.localDescription)
                    socket.emit("videochatinitate", room, directpeer.localDescription)
                })
            }            
        })

        socket.on('directanswer', (id, description) => {
            console.log("Set direct remote description" + description)
            directpeer.setRemoteDescription(description)
        })
        
        socket.on('directcandidate', (id, candidate) => {
            directpeer.addIceCandidate(new RTCIceCandidate(candidate))
                .catch( e => console.error(e))
        })

        socket.on('deniedchat', (id) => {
            document.getElementById("livevideochat").style.display = 'block'
            document.getElementById("livevideochatmessage").style.display = 'none'
            setliveVideo(false)
        })
        
    }, [liveVideo])

    function onLiveVideoChat() {
        document.getElementById("livevideochat").style.display = 'none'
        document.getElementById("livevideochatmessage").style.display = 'block'
        setliveVideo(true)
        socket.emit("privatevideo", room)        
    }

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
                    <video ref={viewer} autoPlay></video>
                    <video ref={livestream} className="directvideo" autoPlay muted>                        
                        <p>This browser does not support the video element.</p>
                    </video>
                </div>
                <div className="localuser" id="livevideochat">
                    <button class="theme_button color1" onClick={onLiveVideoChat}>Live Video Chat</button>
                </div>
                <div className="localuser" id="livevideochatmessage" style={{display: 'none' }}>
                    Waiting for response .....
                </div>
            </div>

            <PromptPopUp isDirtystatus={isDirty} socket={socket} room={room} />

        </article>
    )
}

export default Article
