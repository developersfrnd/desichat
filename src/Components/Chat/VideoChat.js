import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import io from "socket.io-client"
import Constants from '../../Config/Constants';

const VideoChat = ({modelname, modelroom}) => {
    const [room, setRoom] = useState(modelroom)
    const [name, setName] = useState(modelname)
    const [stream, setStream] = useState()
    const peerConnections = {}
    const iceServers = {
        iceServers: [
            { 
            "urls": "stun:stun.l.google.com:19302",
            }
        ],
    }
    let lc


    const EndPoint = Constants.chatServer
    const socket = io.connect(EndPoint)
    
    useEffect(() => { 
        navigator.mediaDevices.getUserMedia({video:true, audio:true}).then(stream => {
            if (window.stream) {
                window.stream.getTracks().forEach(track => {
                track.stop();
                });
            }
            setStream(stream)
            document.getElementById("sender").srcObject = stream
            socket.emit("start", room)
        })

        socket.on('watcher', (id) => {
            console.log("New watcher want to connect")
            peerConnections[id] = new RTCPeerConnection(iceServers) 
            lc = peerConnections[id]
                let stream = document.getElementById("sender").srcObject
                stream.getTracks().forEach(track => lc.addTrack(track, stream));
                lc.onicecandidate = e => {
                    if (e.candidate) {
                        socket.emit("candidate", id, e.candidate)
                    } 
                }
                lc.onnegotiationneeded = () => {
                    lc.createOffer()
                    .then(offer => lc.setLocalDescription(offer)).catch( error => console.log(error))
                    .then( () => {
                        console.log(lc.localDescription)
                        socket.emit("offer", id, lc.localDescription)
                    })
                }
        })
        
        socket.on('answer', (id, description) => {
            console.log("Set answer")
            console.log(description)
            peerConnections[id].setRemoteDescription(description)
        })
        
        socket.on('candidate', (id, candidate) => {
            peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate))
                .catch( e => console.error(e))
        })

        socket.on('watcherleave', (id) => { 
            if(peerConnections[id])  {         
                peerConnections[id].close()
                delete peerConnections[id]                
                console.log(`${id} is disconnect`)
            }
        })         
        
    },[modelroom])
      
    
    

    return (
        <div className="col-sm-12 bottommargin_40">
            <div className="side-item event-item content-padding with_background">
                <div className="row">
                    <div className="col-md-12">
                        <div className="video-media">
                            <div className="item-content with_padding">
                                <video id="sender" playsInline autoPlay></video>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoChat;