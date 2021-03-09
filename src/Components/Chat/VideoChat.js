import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import io from "socket.io-client"
import Constants from '../../Config/Constants';

const VideoChat = ({modelname, modelroom}) => {
    const [room, setRoom] = useState(modelroom)
    const [name, setName] = useState(modelname)
    // const [currentviewer, setcurrentviewer] = useState('')
    // const [broadcasterroom, setbroadcasterroom] = useState('')
    const sendervideo = React.useRef()
    const livestream = React.useRef()
    const livevideostatus = React.useRef(false)
    const broadcasterroom = React.useRef('')
    const currentviewer = React.useRef('')
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
    
    const EndPoint = Constants.chatServer
    const socket = io.connect(EndPoint, {transports: [ 'websocket' ]})
    const lcpeerConnections = {}
    let lc
    let directpeer

    useEffect(() => { 
        navigator.mediaDevices.getUserMedia({video:{frameRate:24}, audio: {sampleSize: 8, echoCancellation: true}}).then(stream => {
            if (window.stream) {
                window.stream.getTracks().forEach(track => {
                track.stop();
                });
            }
            console.log(stream)
            sendervideo.current.srcObject = stream
            socket.emit("start", room)
        })
    },[])

    useEffect(() => {        
         socket.on('watcher', (id) => {             
            if (livevideostatus.current) {
                socket.emit("in_private_chat", id)
                return false
            } 
            console.log("New watcher want to connect")
            lc = new RTCPeerConnection(iceServers) 
            lcpeerConnections[id] = lc
                const localstream = sendervideo.current.srcObject
                localstream.getTracks().forEach(track => lc.addTrack(track, localstream));
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
            console.log(`${id} is about to leave`)
            if(lcpeerConnections[id])  {         
                lcpeerConnections[id].close()
                delete lcpeerConnections[id]
                console.log(`${id} has been leaved`)
            }
            console.log(`Live video status is ${livevideostatus.current}`)
            if (livevideostatus.current) {
                console.log('live video user has been leaved')
                directpeer.close()
                livevideostatus.current = false
                livestream.current.srcObject = null
                socket.emit("livechatremove", room)
            }
        })
        
        socket.on('brodcasterleave', () => { 
            console.log(lcpeerConnections)
            console.log("close.....")
            if (Object.keys(lcpeerConnections).length){
                Object.keys(lcpeerConnections).forEach(function(key) {
                    lcpeerConnections[key].close()
                });
                livevideostatus.current = false             
                
            }
        })             

        socket.on('privatevideo', (id, room) => {
            if(!livevideostatus.current){
                console.log(lcpeerConnections)
                currentviewer.current = id
                broadcasterroom.current = room      
                console.log(`current viewer is ${currentviewer.current}`)       
                document.getElementById("videochatpermission").style.display = 'block'
            }else{
                socket.emit("deniedchat", id)
            }
        })

        socket.on('videochatinitate', (id, description) => {
            if (Object.keys(lcpeerConnections).length){
                Object.keys(lcpeerConnections).forEach(function(key) {
                    console.log(`${key} is equal ${id}`)
                    if (key != id){
                        lcpeerConnections[key].close()
                        // let stream = document.getElementById("sender").srcObject
                        // stream.getTracks().forEach(t => t.enabled = !t.enabled);
                    }
                });
            }
            document.getElementById("videochatpermission").style.display = 'none'
            console.log("Get direct offer from viewer("+id+") and offer is " + description)
            livevideostatus.current = true
            console.log(`Live video status is ${livevideostatus.current}`)
            directpeer = new RTCPeerConnection(iceServers)
            directpeer
            .setRemoteDescription(description)
            .then(e => console.log('Set direct remote description'))
            .then(() => directpeer.createAnswer()).catch(error => console.log(error))
            .then(answer => directpeer.setLocalDescription(answer)).catch(error => console.log(error))
            .then(() => {
                console.log("Direct answer genrate from broadcaster" + directpeer.localDescription)
                socket.emit("directanswer", room, id, directpeer.localDescription)
            }).catch(error => console.log(error))
            directpeer.ontrack = e => {   
                console.log("Sender geting stream from viewer")       
                console.log(e.streams[0])
                livestream.current.srcObject = e.streams[0]
            }
            directpeer.onicecandidate = e => {
                if (e.candidate) {
                    socket.emit("directcandidate", id, e.candidate)
                }
                
            }            
        })

        socket.on('directcandidate', (id, candidate) => {
            directpeer.addIceCandidate(new RTCIceCandidate(candidate))
                .catch( e => console.error(e))
        })
        
        return () => {
            console.log("Unmount all vidoe chat")
        }
        
    },[modelroom, livevideostatus])

    const onStartVideoChat = (e, permission) => {
        e.preventDefault()
        if(permission == "Yes"){
            socket.emit("acceptchat", currentviewer.current)
        }else{
            socket.emit("deniedchat", currentviewer.current)
            document.getElementById("videochatpermission").style.display = 'none'
        }
    }   

    return (
        <div className="col-sm-12 bottommargin_40">
            <div className="side-item event-item content-padding with_background">
                <div className="row">
                    <div className="col-md-12">
                        <div className="video-media">
                            <div className="item-content with_padding">
                                <video className="directvideo" ref={livestream} playsInline autoPlay ></video>
                                <video ref={sendervideo} playsInline autoPlay muted></video>                                
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