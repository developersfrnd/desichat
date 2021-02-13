import React from 'react';
import { Link } from 'react-router-dom'

const PersonalInfo = (props) => {
    return (
        <div className="col-sm-12 bottommargin_40">
            <div className="side-item event-item content-padding with_background">
                <div className="row">
                    <div className="col-md-12">
                        <div className="item-media">
                            <div className="item-content with_padding">
                            <h3 className="entry-title topmargin_0">
                                Personal Information  <Link to="/personal?edit=1"><i className="rt-icon2-edit"></i></Link>
                            </h3>	

                            <ul className="media-list">
                                    <li className="media">
                                        <div className="media-body">
                                            <span className="bold fontsize_12 text-uppercase grey  with_padding">Address:</span>
                                            <span>{props.address}</span>
                                        </div>
                                    </li>
                                    <li className="media">
                                        <div className="media-body">
                                            <span className="bold fontsize_12 text-uppercase grey  with_padding">City:</span>
                                            <span>{props.city}</span>
                                        </div>
                                    </li>
                                    <li className="media">
                                        <div className="media-body">
                                            <span className="bold fontsize_12 text-uppercase grey  with_padding">State:</span>
                                            <span>{props.state}</span>
                                        </div>
                                    </li>
                                    <li className="media">
                                        <div className="media-body">
                                            <span className="bold fontsize_12 text-uppercase grey  with_padding">ZipCode:</span>
                                            <span>{props.zipcode}</span>
                                        </div>
                                    </li>
                                    <li className="media">
                                        <div className="media-body">
                                            <span className="bold fontsize_12 text-uppercase grey  with_padding">Country:</span>
                                            <span>{props.country}</span>
                                        </div>
                                    </li>
                                    <li className="media">
                                        <div className="media-body">
                                            <span className="bold fontsize_12 text-uppercase grey  with_padding">Phone:</span>
                                            <span>{props.phone}</span>
                                        </div>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;