import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

const VideoChat = ({modelname, modelroom, socket}) => {
    const [room, setRoom] = useState(modelroom)
    const [name, setName] = useState(modelname)
    const [stream, setStream] = useState()
    const uservideo = React.useRef()
    useEffect(() => { 

        navigator.mediaDevices.getUserMedia({video:true, audio:false}).then(stream => {
            setStream(stream)
            
            uservideo.current.srcObject = stream
            const peer = new Peer(room, {
                initiator: true,
                trickle:false,
                stream: stream,
                config: {

                    iceServers: [
                        {
                            urls: "stun:numb.viagenie.ca"
                            
                        },
                        {
                            urls: "turn:numb.viagenie.ca"
                            
                        }
                    ]
                }
            })
            peer.on('signal', data => {
                socket.emit("callUser", { usertoCall: room, signaldata: data, from:name})
            })
    
            socket.on("callAccepted", signal => {
                peer.signal(signal);
            })

        }).catch((error) => {
            console.log(error)
        })
    },[modelroom])

    return (
        <div className="col-sm-12 bottommargin_40">
            <div className="side-item event-item content-padding with_background">
                <div className="row">
                    <div className="col-md-12">
                        <div className="item-media">
                            <div className="item-content with_padding">
                                <video muted ref={uservideo} autoPlay></video>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoChat;