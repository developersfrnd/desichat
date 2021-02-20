import React, { useState, useEffect } from 'react'
import VideoChatSessionModel from '../../ApiManager/VideoChatSessionModel'
import Constants from '../../Config/Constants'
import Summary from './Summary'
import styled from "styled-components";
import { useRef } from 'react/cjs/react.development';
import Peer from 'simple-peer'



const Article = ({socket, props}) => {

    const [token, settoken] = useState(null);
    const [channel, setchannel] = useState(null)
    const [stream, setStream] = useState()
    const [room, setRoom] = useState(props.id)
    const [callerSignal, setCallerSignal] = useState();
    const partnerVideo = React.useRef()
    const Video = styled.video`
        border: 1px solid blue;
        width: 50%;
        height: 50%;
    `;

    useEffect(() => { 
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            setStream(stream);
            partnerVideo.current.srcObject = stream
        })         
         
    },[])

    useEffect(() => {  
        socket.on('hey', ({signaldata, from}) => {
            setCallerSignal(signaldata)
            acceptCall()
        })                
    }, [])

    function acceptCall(){
        
        const peer = new Peer(room, {
            initiator: false,
            trickle:false,
            stream: stream
        })

        peer.on('signal', data => {
            socket.emit('acceptCall', { signal: data, to: room})
        })

        peer.on("stream", stream => {
            partnerVideo.current.srcObject = stream;
        })

        peer.signal(callerSignal);

    }

    const PartnerVideo = (
        <Video ref={partnerVideo} autoPlay />
      )

    return (
        <article className="vertical-item post format-video with_background">
            <div className="entry-thumbnail">
                <div className="entry-meta-corner">
                    <span className="date">
                        <time dateTime="2016-08-01T15:05:23+00:00" className="entry-date">
                            <strong>{ new Date().getDate() }</strong>
                            { Constants.monthNames[new Date().getMonth()] }
                        </time>
                    </span>

                    <span className="comments-link">
                        <a href="#">
                            <i className="rt-icon2-bubble highlight"></i> 425
                        </a>
                    </span>
                </div>
                <div className="embed-responsive embed-responsive-3by2">
                    { 
                        (token) ? <Call token={token} channel={channel}  /> : <img src={props.profilePicture} alt={props.name} /> 
                    }
                    
                    {PartnerVideo} 
                    
                </div>
                <button> Start Broadcasting </button>
                <button> Start Private Chat </button>
            </div>

            <Summary {...props} /> 
        </article>
    )
}

export default Article
