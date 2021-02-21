import React from 'react';
import { Link } from 'react-router-dom'

const listItem = (props) => {
    const profilePicture = (props.profilePicture) ? props.profilePicture : "img/no-image.jpg"
    const countryFlag = (props.country) ? `<img src="images/flag/${props.country}.png" style={{width:"10%"}} />` : null

    return (
        <div className="isotope-item col-lg-3 col-md-4 col-sm-4 fashion">
            <div className="vertical-item content-absolute">
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
                                            return <img src={flag} style={{ "width": "10%", "padding-left": "2px" }} />
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
                                <span>30 Credit/min.</span>
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
        </div>
    );
}


export default listItem;