import React, { useState, useEffect } from 'react';
import PublicChat from './PublicChat';

const VideoChat = ({socket, modelname, modelroom}) => {
    const [room, setRoom] = useState(modelroom)
    const [name, setName] = useState(modelname)
    // const [currentviewer, setcurrentviewer] = useState('')
    // const [broadcasterroom, setbroadcasterroom] = useState('')
    const sendervideo = React.useRef()
    const livestream = React.useRef()
    const livevideoid = React.useRef('')
    const broadcasterroom = React.useRef('')
    const currentviewer = React.useRef('')
    let isPrivate = false
    const iceServers = {
        iceServers: [
            { 
                "urls": [
                        "stun:stun.l.google.com:19302"
                ]
            },
            {
                urls: 'turn:numb.viagenie.ca',
                credential: 'muazkh',
                username: 'webrtc@live.com'
            }
        ],
    }
    
    const lcpeerConnections = {}
    let directpeer
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
        navigator.mediaDevices.getUserMedia({video:{frameRate:24}, audio: audio_constraints}).then(stream => {
            // if (window.stream) {
            //     window.stream.getTracks().forEach(track => {
            //     track.stop();
            //     });
            // }
            //console.log(stream)
            sendervideo.current.srcObject = stream
            socket.emit("broadcaster", room)
        })
    },[])

    useEffect(() => {        
         socket.on('watcher', (id) => {  
            console.log("New watcher want to connect ", id)
            const lc = new RTCPeerConnection(iceServers) 
            lcpeerConnections[id] = lc
                let localstream = sendervideo.current.srcObject
                localstream.getTracks().forEach(track => lc.addTrack(track, localstream));
                lc.onicecandidate = e => {
                    if (e.candidate) {                        
                        socket.emit("candidate", id, e.candidate)
                    } 
                }
                //lc.onnegotiationneeded = () => {
                lc.createOffer()
                    .then(offer => lc.setLocalDescription(offer)).catch( error => console.log(error))
                    .then( () => {
                        console.log(lc.localDescription)
                        socket.emit("offer", id, lc.localDescription, isPrivate)
                    })
                //}
        })
        
        socket.on('answer', (id, description) => {
            console.log("Set answer")
            lcpeerConnections[id].setRemoteDescription(description)
        })
        
        socket.on('candidate', (id, candidate) => {
            lcpeerConnections[id].addIceCandidate(new RTCIceCandidate(candidate))
                .catch( e => console.error(e))
        })

        socket.on("disconnectPeer", id => {
            if(lcpeerConnections[id])  {
                console.log(`${id} watcher has been leaved`)
                lcpeerConnections[id].close();
                delete lcpeerConnections[id];
                if(livevideoid.current == id){
                    socket.emit("removeprivatechat", room);
                }
            }
        })

        socket.on("removeprivatechat", ()=>{
            isPrivate = false
            livestream.current.srcObject = null
        })

        socket.on("offer", (id, description, isChatPrivate) => {
            console.log("private socket id", id)
            lcpeerConnections[id]
              .setRemoteDescription(description)
              .then(() => lcpeerConnections[id].createAnswer())
              .then(sdp => lcpeerConnections[id].setLocalDescription(sdp))
              .then(() => {
                isPrivate = true
                socket.emit("answer", id, lcpeerConnections[id].localDescription);
                socket.emit("privatechat", id, room)
                livevideoid.current = id
              });
            lcpeerConnections[id].ontrack = event => {
                livestream.current.srcObject = event.streams[0];
            };
        });

        // socket.on('watcherleave', (id) => { 
        //     console.log(`${id} is about to leave`)
        //     if(lcpeerConnections[id])  {         
        //         lcpeerConnections[id].close()
        //         delete lcpeerConnections[id]
        //         console.log(`${id} has been leaved`)
        //     }
        //     console.log(`Live video status is ${livevideostatus.current}`)
        //     if (livevideostatus.current && currentviewer.current == id) {
        //         console.log('live video user has been leaved')
        //         directpeer.close()
        //         livevideostatus.current = false
        //         livestream.current.srcObject = null
        //         socket.emit("livechatremove", room)
        //     }
        // })
        
        // socket.on('brodcasterleave', () => { 
        //     console.log(lcpeerConnections)
        //     console.log("close.....")
        //     if (Object.keys(lcpeerConnections).length){
        //         Object.keys(lcpeerConnections).forEach(function(key) {
        //             lcpeerConnections[key].close()
        //         });
        //         livevideostatus.current = false             
                
        //     }
        // })             

        // socket.on('privatevideo', (id, room) => {
        //     if(!livevideostatus.current){
        //         console.log(lcpeerConnections)
        //         currentviewer.current = id
        //         broadcasterroom.current = room      
        //         console.log(`current viewer is ${currentviewer.current}`)       
        //         document.getElementById("videochatpermission").style.display = 'block'
        //     }else{
        //         socket.emit("deniedchat", id)
        //     }
        // })

        // socket.on('videochatinitate', (id, description) => {
        //     if (Object.keys(lcpeerConnections).length){
        //         Object.keys(lcpeerConnections).forEach(function(key) {
        //             console.log(`${key} is equal ${id}`)
        //             if (key != id){
        //                 lcpeerConnections[key].close()
        //                 // let stream = document.getElementById("sender").srcObject
        //                 // stream.getTracks().forEach(t => t.enabled = !t.enabled);
        //             }
        //         });
        //     }
        //     document.getElementById("videochatpermission").style.display = 'none'
        //     console.log("Get direct offer from viewer("+id+") and offer is " + description)
        //     livevideostatus.current = true
        //     console.log(`Live video status is ${livevideostatus.current}`)
        //     directpeer = new RTCPeerConnection(iceServers)
        //     directpeer
        //     .setRemoteDescription(description)
        //     .then(e => console.log('Set direct remote description'))
        //     .then(() => directpeer.createAnswer()).catch(error => console.log(error))
        //     .then(answer => directpeer.setLocalDescription(answer)).catch(error => console.log(error))
        //     .then(() => {
        //         console.log("Direct answer genrate from broadcaster" + directpeer.localDescription)
        //         socket.emit("directanswer", room, id, directpeer.localDescription)
        //     }).catch(error => console.log(error))
        //     directpeer.ontrack = e => {   
        //         console.log("Sender geting stream from viewer")       
        //         console.log(e.streams[0])
        //         livestream.current.srcObject = e.streams[0]
        //     }
        //     directpeer.onicecandidate = e => {
        //         if (e.candidate) {
        //             socket.emit("directcandidate", id, e.candidate)
        //         }
                
        //     }            
        // })

        // socket.on('directcandidate', (id, candidate) => {
        //     directpeer.addIceCandidate(new RTCIceCandidate(candidate))
        //         .catch( e => console.error(e))
        // })

        // socket.on('livechatremove', () => {
        //     console.log('live video user has been leaved')
        //     directpeer.close()
        //     livevideostatus.current = false
        //     livestream.current.srcObject = null            
        // })
        
        socket.on('startprivatevideochat', (id)=>{
            currentviewer.current = id
            document.getElementById("videochatpermission").style.display = 'block'
        })


        return () => {
            console.log("Unmount all vidoe chat")
        }
        
    },[socket])

    const onStartVideoChat = (e, permission) => {
        e.preventDefault()
        if(permission == "Yes"){
            socket.emit("acceptchat", currentviewer.current)
            document.getElementById("videochatpermission").style.display = 'none'
        }else{
            socket.emit("deniedchat", currentviewer.current)
            document.getElementById("videochatpermission").style.display = 'none'
        }
    }   

    return (
        <div className="col-sm-12 bottommargin_40">
            <PublicChat 
                socket={socket}
                modelname={name} 
                modelroom={room}  
            />
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