import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Like from '../../Like';

const listItem = (props) => {
    const profilePicture = (props.profilePicture) ? props.profilePicture : "/img/no-image.jpg"
    const countryFlag = (props.country) ? `<img src="images/flag/${props.country}.png" style={{width:"10%"}} />` : null

    return (
            <div className="vertical-item content-absolute">
                <Like model_id={props.id} isLiked={props.is_liked} />
                <div className="item-media">
                    <img src={profilePicture} alt="" />
                    <div className="media-links"></div>
                </div>
                <div className="item-content text-center before_cover cs">

                    <div className="links-wrap">
                        <a className="p-link" title="" href="#">
                            {props.name} &nbsp;
                            (
                                {(props.age) ? `${props.age} Yrs` : null} &nbsp;
                                {(props.country) ? <img src={`images/flag/${props.country}.png`} style={{ width: "10%" }} /> : null}
                            )
                        </a>
                    </div>

                    <div className="bg_overlay"></div>
                    <div className="model-parameters">

                        {
                            (props.speaking) ?
                                <div className="iSpeak">
                                    <span className="bold">I speak</span>
                                    <br />
                                    <span>
                                        {props.speaking.map((speak) => {
                                            let flag = `images/flag/${speak.flag}`
                                            return <img src={flag} key={flag} style={{ "width": "10%", "paddingLeft": "2px" }} />
                                        })}
                                    </span>
                                </div>

                                : null
                        }
                        <div className="ratingRow">
                            <div>
                                <span className="bold">Rating</span>
                                <br />
                                <span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                </span>
                            </div>
                            <div>
                                <span className="bold">Group</span>
                                <br />
                                <span>{props.cherges} Credit/min.</span>
                            </div>
                        </div>
                        <div>
                            <br />
                            <span>
                                <Link to={`model/${props.id}`}>
                                    <button type="button" className="theme_button color1">Profile</button>
                                </Link>
                            </span>
                        </div>
                        <div>
                            <br />
                            <span>
                                {
                                    (props.is_online) ?
                                        <Link to={`model/${props.id}`}>
                                            <button type="button" className="theme_button" style={{ "backgroundColor": "#4cb80e !important" }}>Free Chat</button>
                                        </Link>
                                        :
                                        <Link to={`model/${props.id}`}>
                                            <button type="button" className="theme_button" style={{ "backgroundColor": "#999999 !important" }}>Offline</button>
                                        </Link>
                                }
                            </span>
                        </div>
                    </div>
                </div>
                {
                    (props.is_online) ?
                        <div className="onlineSign">
                            Online
                    </div>
                        : null
                }
            </div>
    );
}


export default listItem;