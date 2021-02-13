import React, { useState, useEffect } from 'react'
import VideoChatSessionModel from '../../ApiManager/VideoChatSessionModel'
import Constants from '../../Config/Constants'
import Call from './Call'
import Summary from './Summary'

function Article(props) {

    const [token, settoken] = useState(null);
    const [channel, setchannel] = useState(null)

    const startStream = () => {
        VideoChatSessionModel.postVideoChat({})
            .then(res => {
                console.log(res)
                settoken(res.data.data.token);
            })
    }

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
                    
                    { /* <img src={props.profilePicture} alt={props.name} /> */ } 
                    
                </div>
                <button onClick={ startStream }> Start Broadcasting </button>
                <button onClick={ startStream }> Start Private Chat </button>
            </div>

            <Summary {...props} /> 
        </article>
    )
}

export default Article
