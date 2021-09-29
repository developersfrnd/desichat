import React, { useState, useEffect, useContext } from 'react'
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
import VolumeControl from '../Loaders/VolumeControl'
import { ArrowsFullscreen } from 'react-bootstrap-icons';
import ModelChat from '../Chat/ModelChat';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import authModel from '../../ApiManager/auth';


const Article = ({ coin, socket, props }) => {
    const [token, settoken] = useState(null);     
    const [channel, setchannel] = useState(null)
    const [isDirty, setDirty] = useState(true)
    const [showvolume, setShowVolume] = useState(false)
    const [volumerange, setVolumeRange] = useState(0.5)
    const [privatechat, setPrivateChat] = useState(false)
    const [livechat, setLiveChat] = useState(false)
    const [remotestream, setRemoteStream] = useState(false)
    const [room, setRoom] = useState(props.id)
    const [updatedcoin, setUpdatedCoin] =  useState(coin)
    const [buttonhtml, setButtonHtml] = useState("Start Private Chat")
    const [disabledchatbutton, setDisabledChatButton] = useState(false)
    const partnerVideo = React.useRef()
    const liveVideo = React.useRef(false)
    const startinterval = React.useRef(0)
    const streamid = React.useRef(0)
    const counter = React.useRef(1)
    let connectedModelSocketId = React.useRef(null);
    let isPrivate = false
    let MINUTE_MS = 5000;
    let NEXT_MINUTE_MS = 65000;
    let private_chat_interval
    let rc
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
    let remotePeerConnection = React.useRef(null);
    let viewer = React.useRef()
    let livestream = React.useRef()

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
        socket.on("connect", () => {
            console.log('Connected with', socket.id); 
            socket.emit("watcher", room);
        });
        //socket.emit("register as viewer", room);
    },[])

    useEffect(() => { 
        console.log("connectedModelSocketId", connectedModelSocketId.current)
        socket.on("offer", (id, description, brodcasterInPrivateChat) => {
            console.log("Get offer from broadcaster")
            console.log(description)
            connectedModelSocketId.current = id
            remotePeerConnection.current = new RTCPeerConnection(iceServers)
            let rtcPeerConnection = remotePeerConnection.current
            rtcPeerConnection
            .setRemoteDescription(description)
            .then(e => console.log('remote description'))
            .then(() => rtcPeerConnection.createAnswer()).catch(error => console.log(error))
            .then(answer => rtcPeerConnection.setLocalDescription(answer)).catch(error => console.log(error))
            .then(() => {
                setRemoteStream(true)
                socket.emit("answer", id, rtcPeerConnection.localDescription)
            }).catch(error => console.log(error))
            rtcPeerConnection.ontrack = e => {
                if(brodcasterInPrivateChat){
                    e.track.enabled = false
                    setRemoteStream(false)
                }
                viewer.current.srcObject = e.streams[0]                
            }
            if(brodcasterInPrivateChat){
                setPrivateChat(true)
                setLiveChat(false)
                setRemoteStream(false)
            }
            rtcPeerConnection.onicecandidate = e => {
                if (e.candidate) {
                    socket.emit("candidate", id, e.candidate)
                }
            }
        })

        socket.on('candidate', (id, candidate) => {
            remotePeerConnection.current.addIceCandidate(new RTCIceCandidate(candidate))
                .catch(e => console.error(e))
        })


        socket.on("broadcaster", () => {
            console.log("New broadcaster join")
            socket.emit("watcher", room)
        })


        socket.on("disconnectPeer", id => {
            console.log(`${id} model has about to left`)
            if(id == connectedModelSocketId.current){
                console.log(`${connectedModelSocketId.current} model has been left`)
                remotePeerConnection.current.close()
                viewer.current.srcObject = null
                livestream.current.srcObject = null
                setPrivateChat(false)
                setLiveChat(false)
                setRemoteStream(false)
                isPrivate = false
                setButtonHtml("Start Private Chat")
                setDisabledChatButton(false)
                stopReduce()
            }
        })

        // socket.on("brodcasterleave", (brodcastersocketid) => {
        //     if(rtcPeerConnections[brodcastersocketid]){
        //         rtcPeerConnections[brodcastersocketid].close()
        //         console.log(`${brodcastersocketid} model  has been left`)
        //         delete rtcPeerConnections[brodcastersocketid]
        //         viewer.current.srcObject = null
        //     }
        //     console.log(`Live vidoe status is ${liveVideo.current}`)
        //     if(liveVideo.current){
        //         disConnectLiveChat()
        //     }
        //     document.getElementById("livevideochat").style.display = 'none'
        //     setPrivateChat(false)
        //     setShowVolume(false)
        // })
        
        // socket.on("in_private_chat", (id) => {
        //     document.getElementById("livevideochat").style.display = 'none'
        //     setPrivateChat(true)
        // })
       
        // socket.on('iniatevideo', (id) => {
        //     liveVideo.current = true
        //     document.getElementById("livevideochat").style.display = 'none'
        //     document.getElementById("livevideochatmessage").style.display = 'none'
        //     var constraints = {
        //         audio: true,
        //         video: true
        //     };
        //     directpeer = new RTCPeerConnection(iceServers)
        //     navigator.mediaDevices.getUserMedia({video:{facingMode: "user", frameRate:{ideal: 60,min: 10},width: { min: 640, ideal: 1920 },height: { min: 400, ideal: 1080 },aspectRatio: { ideal: 1.7777777778 }}, audio: audio_constraints}).then(stream => {
        //         livestream.current.srcObject = stream           
        //         //const stream = livestream.current.captureStream();
        //         console.log(stream)
        //         stream.getTracks().forEach((track) => {
        //             directpeer.addTrack(track, stream)
        //             console.log(track.getSettings());
        //         });
        //     }).catch(error => console.log(error))
        //     directpeer.onicecandidate = e => {
        //         if (e.candidate) {
        //             socket.emit("directcandidate", id, e.candidate)
        //         }
        //     }
        //     directpeer.onnegotiationneeded = () => {
        //         directpeer.createOffer()
        //         .then(offer => directpeer.setLocalDescription(offer)).catch( error => console.log(error))
        //         .then( () => {
        //             console.log("Direct offer genrate "+directpeer.localDescription)
        //             socket.emit("videochatinitate", room, directpeer.localDescription)
        //         })
        //     }            
        // })

        // socket.on('directanswer', (id, description) => {
        //     console.log("Set direct remote description" + description)
        //     directpeer.setRemoteDescription(description)
        //     .then( e => socket.emit("livechat", room))
        //     .then( e => FirstReduce())
        //     .catch( e => console.error(e))
        // })

        socket.on("answer", (id, description) => {
            isPrivate = true     
            setLiveChat(true)
            document.getElementById("livevideochatmessage").style.display = 'none'       
            remotePeerConnection.current.setRemoteDescription(description)
            .then( e => FirstReduce())
            .catch( e => console.error(e))
        });

        socket.on("privatechat", () => {
            if(!isPrivate){     
                let stream = viewer.current.srcObject;      
                if(stream){
                    stream.getTracks().forEach(track => {
                        track.enabled = !track.enabled;
                    })
                    setPrivateChat(true)
                    setLiveChat(false)
                    setRemoteStream(false)
                }
            }
        });

        socket.on("removeprivatechat", () => {
            console.log("Remove Live Private Chat", socket.id)
            isPrivate = false
            setPrivateChat(false)
            setLiveChat(false)
            setRemoteStream(true)
            setButtonHtml("Start Private Chat")
            setDisabledChatButton(false)
            console.log(socket.id)
            let stream = viewer.current.srcObject;
            stream.getTracks().forEach(track => {
                track.enabled = true
            });
            stopReduce()             
        });
        
        // socket.on('directcandidate', (id, candidate) => {            
        //     directpeer.addIceCandidate(new RTCIceCandidate(candidate))
        //     .then( e => console.log("Set direct candidate" + candidate))
        //     .catch( e => console.error(e))
        // })

        // socket.on('livechat', () => {
        //     viewer.current.srcObject = null
        //     document.getElementById("livevideochat").style.display = 'none'
        //     setPrivateChat(true)
        //     setShowVolume(false)
        // })

        // socket.on('livechatremove', () => {
        //     console.log("live chat remove")
        //     document.getElementById("livevideochat").style.display = 'block'
        //     setPrivateChat(false)
        //     socket.emit("register as viewer", room);  
        //     setShowVolume(true)          
        // })

        socket.on('acceptchat', (id) => {
            console.log(remotePeerConnection.current,id)
            navigator.mediaDevices.getUserMedia({video:{facingMode: "user", frameRate:{ideal: 60,min: 10},width: { min: 640, ideal: 1920 },height: { min: 400, ideal: 1080 },aspectRatio: { ideal: 1.7777777778 }}, audio: audio_constraints})
            .then(stream => {   
                    stream.getTracks().forEach((track) => {
                        remotePeerConnection.current.addTrack(track, stream)
                    });
                    livestream.current.srcObject = stream
                    remotePeerConnection.current
                    .createOffer()
                    .then(sdp => remotePeerConnection.current.setLocalDescription(sdp))
                    .then(() => {
                        console.log(socket.id)
                        socket.emit("offer", id, remotePeerConnection.current.localDescription, isPrivate);
                    });
                })
        })

        socket.on('deniedchat', (id) => {
            setLiveChat(false)
            setPrivateChat(false)
            isPrivate = false
            setButtonHtml("Start Private Chat")
            setDisabledChatButton(false)
            stopReduce()
        })

        // socket.on('deniedchat', (id) => {
        //     document.getElementById("livevideochat").style.display = 'block'
        //     document.getElementById("livevideochatmessage").style.display = 'none'
        //     liveVideo.current = false
        // })
        
        return () => {            
            stopReduce()
        }
    }, [socket])

    // useEffect(() => {
    //     effect
    //     return () => {
    //         cleanup
    //     }
    // }, [privatechat])

    const stopReduce = () => {
        console.log("Stop reduce")
        clearInterval(startinterval.current)
    }

    const FirstReduce = () => {
        startinterval.current = setInterval(()=>{
            reduceCoin({'room_id':room, 'history_id':streamid.current}).then(()=>{
                stopReduce()
            }).then(()=>{
                NextReduce()
            })
         }, MINUTE_MS)
    }

    const NextReduce = () => {
        startinterval.current = setInterval(()=>{
            reduceCoin({'room_id':room, 'history_id':streamid.current})
         }, NEXT_MINUTE_MS)
    }

    // const disConnectLiveChat = () => {
    //         directpeer.close()
    //         livestream.current.srcObject = null
    //         liveVideo.current = false
    //         streamid.current = 0
    //         document.getElementById("livevideochat").style.display = 'block'
    //         setPrivateChat(false)
    //         stopReduce()
    // }

    const disConnectLiveChat = () => {
        let stream = livestream.current.srcObject
        if (stream){
            stream.getTracks().forEach(track => track.stop());
            isPrivate = false
            socket.emit("removeprivatechat", room);
            stopReduce()
            livestream.current.srcObject = null
        }        
    }

    const onLiveVideoChat = () => {
        confirmAlert({
            title: 'Start Private Chat',
            message: 'Are you sure to start private chat.',
            buttons: [
              {
                label: 'Yes',
                onClick: () =>{
                    console.log("Live Private Chat", socket.id)
                    setButtonHtml("Waiting for response .....")
                    setDisabledChatButton(true)
                    usersModel.checkUserCoin({'room_id':room}).then( () => {            
                        socket.emit("startprivatevideochat", connectedModelSocketId.current)
                    }).catch( (error) => {
                        setButtonHtml("Start Private Chat")
                        setDisabledChatButton(false)
                        toast.error(error.response.data.message)
                    })
                }
              },
              {
                label: 'No',
                onClick: () => console.log("No")
              }
            ]
          });
                        
    }
    const reduceCoin = async(data) => {
        await usersModel.reduceUserCoin(data).then(response => {
            streamid.current = response.data.data.history_id
            updateCoin(response.data.data.coin)
        }).catch( (error) => {
            disConnectLiveChat()
        }) 
    }

    const handelVolume = (value) => {
        if (viewer.current.srcObject){
           setVolumeRange(value)
           viewer.current.volume = value
        }
    }

    const onFullScreen = () => {
        if (viewer.current.srcObject){
            const remote_video = viewer.current;
            if (remote_video.requestFullscreen) {
                remote_video.requestFullscreen();
            } else if (remote_video.msRequestFullscreen) {
                remote_video.msRequestFullscreen();
            } else if (remote_video.mozRequestFullScreen) {
                remote_video.mozRequestFullScreen();
            } else if (remote_video.webkitRequestFullscreen) {
                remote_video.webkitRequestFullscreen();
            }
        }
    }

    const updateCoin = (coin) => {
        setUpdatedCoin(coin)
        let userObj = authModel.getAuthUserObj();
        authModel.setAuthToken({...userObj,creditPoints:coin});
    }

    return (
        <>
        <div className="modelPictureContainer">
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
                    <video ref={viewer} playsInline autoPlay></video>
                    <video ref={livestream} className="directvideo" playsInline autoPlay muted>                        
                        <p>This browser does not support the video element.</p>
                    </video>
                    { privatechat && <div class="no-video" id="in-private-chat">
                        <div class="msg">I'm in Private Chat</div>
                    </div>}
                    { remotestream && <div className="volume"><VolumeControl
                        onChange={handelVolume}
                        value={volumerange}
                    /> <ArrowsFullscreen onClick={onFullScreen} color="#e0006c" size={25} /></div>}
                </div>                
                { (remotestream && !livechat) && <div className="localuser" id="livevideochat">
                    <button class="theme_button color1" disabled={disabledchatbutton} onClick={onLiveVideoChat}>{buttonhtml}</button>
                </div>}
                { livechat && <div class="localuser">
                        <button class="theme_button color1" onClick={disConnectLiveChat}>Leave Private Chat</button>
                    </div>}
                <div className="localuser" id="livevideochatmessage" style={{display: 'none' }}>
                    Waiting for response .....
                </div>
            </div>

            <PromptPopUp isDirtystatus={isDirty} socket={socket} room={room} />

        </article>
        </div>
         <div class="chatboxcontainer">
            <ModelChat coin={updatedcoin} socket={socket} props={props} />
         </div>
        </>
    )
}

export default Article
