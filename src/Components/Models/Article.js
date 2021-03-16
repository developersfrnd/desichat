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
import usersModel from '../../ApiManager/user';
import { toast } from 'react-toastify';

const Article = ({ socket, props }) => {

    const [token, settoken] = useState(null);
    const [channel, setchannel] = useState(null)
    const [isDirty, setDirty] = useState(true)
    const [room, setRoom] = useState(props.id)
    //const [counter, setCounter] = useState(1);
    const partnerVideo = React.useRef()
    const liveVideo = React.useRef(false)
    const startinterval = React.useRef(0)
    const counter = React.useRef(1)
    const rtcPeerConnections = {}
    let directpeer
    const EndPoint = Constants.chatServer
    //const socket = io.connect(EndPoint, {transports: [ 'websocket' ]})
    let MINUTE_MS = 5000;
    let NEXT_MINUTE_MS = 10000;
    let private_chat_interval 

    let rc
    const iceServers = {
        iceServers: [
            { 
                "urls": [
                        "stun:stun.l.google.com:19302",
                        "stun:stun1.l.google.com:19302",
                        "stun:stun2.l.google.com:19302"
                ]
            },
            {
                urls: 'turn:numb.viagenie.ca',
                credential: 'muazkh',
                username: 'webrtc@live.com'
            }
        ],
    }
    const viewer = React.useRef()
    const livestream = React.useRef()

    let audio_constraints = {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
        googEchoCancellation: true,
        googAutoGainControl: true,
        googExperimentalAutoGainControl: false,
        googNoiseSuppression: true,
        googExperimentalNoiseSuppression: false,
        googHighpassFilter: false,
        googTypingNoiseDetection: false,
        googBeamforming: false,
        googArrayGeometry: false,
        googAudioMirroring: false,
        googAudioMirroring: false,
        googNoiseReduction: false,
        mozNoiseSuppression: true,
        mozAutoGainControl: true
    }
    
    useEffect(() => {
        stopReduce()
        console.log("register as viewer")
        socket.emit("register as viewer", room);
    },[])

    useEffect(() => { 
        socket.on("offer", (id, description) => {
            console.log("Get offer from broadcaster")
            console.log(description)
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
                document.getElementById("livevideochat").style.display = "block"
                viewer.current.srcObject = e.streams[0]
                document.getElementById("in-private-chat").style.display = 'none'
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
            console.log("New broadcaster join")
            socket.emit("watcher", room)
        })

        socket.on("brodcasterleave", (brodcastersocketid) => {
            if(rtcPeerConnections[brodcastersocketid]){
                rtcPeerConnections[brodcastersocketid].close()
                console.log(`${brodcastersocketid} model  has been left`)
                delete rtcPeerConnections[brodcastersocketid]
                viewer.current.srcObject = null
            }
            console.log(`Live vidoe status is ${liveVideo.current}`)
            if(liveVideo.current){
                disConnectLiveChat()
            }
            document.getElementById("livevideochat").style.display = 'none'
            document.getElementById("in-private-chat").style.display = 'none'
        })
        
        socket.on("in_private_chat", (id) => {
            document.getElementById("livevideochat").style.display = 'none'
            document.getElementById("in-private-chat").style.display = 'block'
        })
       
        socket.on('iniatevideo', (id) => {
            liveVideo.current = true
            document.getElementById("livevideochat").style.display = 'none'
            document.getElementById("livevideochatmessage").style.display = 'none'
            var constraints = {
                audio: true,
                video: true
            };
            directpeer = new RTCPeerConnection(iceServers)
            navigator.mediaDevices.getUserMedia({video:{frameRate:24}, audio: audio_constraints}).then(stream => {
                livestream.current.srcObject = stream           
                //const stream = livestream.current.captureStream();
                console.log(stream)
                stream.getTracks().forEach(track => directpeer.addTrack(track, stream));
            }).catch(error => console.log(error))
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
            .then( e => socket.emit("livechat", room))
            .then( e => FirstReduce())
            .catch( e => console.error(e))
        })
        
        socket.on('directcandidate', (id, candidate) => {            
            directpeer.addIceCandidate(new RTCIceCandidate(candidate))
            .then( e => console.log("Set direct candidate" + candidate))
            .catch( e => console.error(e))
        })

        socket.on('livechat', () => {
            viewer.current.srcObject = null
            document.getElementById("livevideochat").style.display = 'none'
            document.getElementById("in-private-chat").style.display = 'block'
        })

        socket.on('livechatremove', () => {
            console.log("live chat remove")
            document.getElementById("livevideochat").style.display = 'block'
            document.getElementById("in-private-chat").style.display = 'none'
            socket.emit("register as viewer", room);            
        })

        socket.on('deniedchat', (id) => {
            document.getElementById("livevideochat").style.display = 'block'
            document.getElementById("livevideochatmessage").style.display = 'none'
            liveVideo.current = false
        })
        
        return () => {            
            stopReduce()
        }
    }, [room])

    const stopReduce = () => {
        console.log("Stop reduce")
        clearInterval(startinterval.current)
    }

    const FirstReduce = () => {
        startinterval.current = setInterval(()=>{
            reduceCoin({'room_id':room})
            stopReduce()
            NextReduce()
         }, MINUTE_MS)
    }

    const NextReduce = () => {
        startinterval.current = setInterval(()=>{
            reduceCoin({'room_id':room})
         }, NEXT_MINUTE_MS)
    }

    const disConnectLiveChat = () => {
            directpeer.close()
            livestream.current.srcObject = null
            liveVideo.current = false
            document.getElementById("livevideochat").style.display = 'block'
            document.getElementById("in-private-chat").style.display = 'none'
            stopReduce()
    }

    function onLiveVideoChat() {
        usersModel.checkUserCoin({'room_id':room}).then( () => {
            document.getElementById("livevideochat").style.display = 'none'
            document.getElementById("livevideochatmessage").style.display = 'block'
            socket.emit("privatevideo", room)
        }).catch( (error) => {
            document.getElementById("livevideochat").style.display = 'block'
            document.getElementById("livevideochatmessage").style.display = 'none'
            toast.error(error.response.data.message)
        })                
    }
    const reduceCoin = (data) => {
        usersModel.reduceUserCoin(data).then(e => console.log("Coin dedacted")).catch( (error) => {
            disConnectLiveChat()
            socket.emit("livechatremove", room)
        }) 
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
                    <div class="no-video" id="in-private-chat" style={{display: 'none' }}>
                        <div class="msg">I'm in Private Chat</div>
                    </div>
                </div>
                
                <div className="localuser" id="livevideochat" style={{display: 'none' }}>
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
