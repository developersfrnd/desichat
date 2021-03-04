import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import io from "socket.io-client"
import Constants from '../../Config/Constants';

const VideoChat = ({modelname, modelroom}) => {
    const [room, setRoom] = useState(modelroom)
    const [name, setName] = useState(modelname)
    const [stream, setStream] = useState()
    const [currentviewer, setcurrentviewer] = useState('')
    const [broadcasterroom, setbroadcasterroom] = useState('')
    const [livevideostatus, setlivevideostatus] = useState(false)
    const iceServers = {
        iceServers: [
            { 
            "urls": "stun:stun.l.google.com:19302",
            }
        ],
    }
    const EndPoint = Constants.chatServer
    const socket = io.connect(EndPoint, {transports: [ 'websocket' ]})
    const lcpeerConnections = {}
    let lc
    let directpeer
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
            lc = new RTCPeerConnection(iceServers) 
            lcpeerConnections[id] = lc
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
            lcpeerConnections[id].setRemoteDescription(description)
        })
        
        socket.on('candidate', (id, candidate) => {
            lcpeerConnections[id].addIceCandidate(new RTCIceCandidate(candidate))
                .catch( e => console.error(e))
        })

        socket.on('watcherleave', (id) => { 
            if(lcpeerConnections[id])  {         
                lcpeerConnections[id].close()
                delete lcpeerConnections[id]                
                console.log(`${id} is disconnect`)
            }
        })
        
        socket.on('brodcasterleave', () => { 
            console.log(lcpeerConnections)
            console.log("close.....")
            if (Object.keys(lcpeerConnections).length){
                Object.keys(lcpeerConnections).forEach(function(key) {
                    lcpeerConnections[key].close()
                });
                setlivevideostatus(false)
            }
        })             

        socket.on('privatevideo', (id, room) => {
            if(!livevideostatus){
                console.log(lcpeerConnections)
                setcurrentviewer(id)
                setbroadcasterroom(room)
                setlivevideostatus(true)
                document.getElementById("videochatpermission").style.display = 'block'
            }else{
                socket.emit("deniedchat", id)
            }         
        })

        socket.on('videochatinitate', (id, description) => {
            if (Object.keys(lcpeerConnections).length){
                Object.keys(lcpeerConnections).forEach(function(key) {
                    if (key != id){
                        lcpeerConnections[key].close()
                        // let stream = document.getElementById("sender").srcObject
                        // stream.getTracks().forEach(t => t.enabled = !t.enabled);
                    }
                });
            }
            document.getElementById("videochatpermission").style.display = 'none'
            console.log("Get direct offer from viewer("+id+") and offer is " + description)
            lcpeerConnections[id] = new RTCPeerConnection(iceServers)
            lcpeerConnections[id]
            .setRemoteDescription(description)
            .then(e => console.log('Set direct remote description'))
            .then(() => lcpeerConnections[id].createAnswer()).catch(error => console.log(error))
            .then(answer => lcpeerConnections[id].setLocalDescription(answer)).catch(error => console.log(error))
            .then(() => {
                console.log("Direct answer genrate from broadcaster" + lcpeerConnections[id].localDescription)
                socket.emit("directanswer", room, id, lcpeerConnections[id].localDescription)
            }).catch(error => console.log(error))
            lcpeerConnections[id].ontrack = e => {          
                console.log(e.streams[0])
                document.getElementById("localvideo").srcObject = e.streams[0]
            }
            lcpeerConnections[id].onicecandidate = e => {
                if (e.candidate) {
                    socket.emit("directcandidate", id, e.candidate)
                }
            }
        })

        socket.on('directcandidate', (id, candidate) => {
            lcpeerConnections[id].addIceCandidate(new RTCIceCandidate(candidate))
                .catch( e => console.error(e))
        })            
        
    },[modelroom, livevideostatus])

    const onStartVideoChat = (e, permission) => {
        e.preventDefault()
        if(permission == "Yes"){
            socket.emit("acceptchat", currentviewer)
        }else{
            socket.emit("deniedchat", currentviewer)
        }
    }   

    return (
        <div className="col-sm-12 bottommargin_40">
            <div className="side-item event-item content-padding with_background">
                <div className="row">
                    <div className="col-md-12">
                        <div className="video-media">
                            <div className="item-content with_padding">
                                <video className="directvideo" id="localvideo" playsInline autoPlay muted ></video>
                                <video id="sender" playsInline autoPlay muted></video>                                
                            </div>
                            <div className="localuser" id="videochatpermission" style={{display: 'none' }}>
                                 <button class="theme_button color1" onClick={e => onStartVideoChat(e, "Yes")}>Yes</button>
                                 <button class="theme_button color1" onClick={e => onStartVideoChat(e, "No")}>No</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoChat;