import React from 'react';
import { Link } from 'react-router-dom';

const BasicInfo = (props) => {
    console.log(props);
    return (
        <div className="col-sm-12 bottommargin_40">
            <div className="side-item event-item content-padding with_background">
                <div className="row">
                    <div className="col-md-12">
                        <div className="item-media">
                            <div className="item-content with_padding">
                            <h3 className="entry-title topmargin_0">
                                Basic Information  <Link to="/profile-edit"><i className="rt-icon2-edit"></i></Link>
                            </h3>	

                            <ul className="media-list">
                                    <li className="media">
                                        <div className="media-body">
                                            <span className="bold fontsize_12 text-uppercase grey  with_padding">Name:</span>
                                            <span>{props.name}</span>
                                        </div>
                                    </li>
                                    <li className="media">
                                        <div className="media-body">
                                            <span className="bold fontsize_12 text-uppercase grey  with_padding">Email:</span>
                                            <span>{props.email}</span>
                                        </div>
                                    </li>
                                    <li className="media">
                                        <div className="media-body">
                                            <span className="bold fontsize_12 text-uppercase grey  with_padding">Gender:</span>
                                            <span>{(props.gender) ? 'Male' : 'Female'}</span>
                                        </div>
                                    </li>
                                    <li className="media">
                                        <div className="media-body">
                                            <span className="bold fontsize_12 text-uppercase grey  with_padding">Charge / min:</span>
                                            <span>{props.chargePerMinute}</span>
                                        </div>
                                    </li>
                                    <li className="media">
                                        <div className="media-body">
                                            <span className="bold fontsize_12 text-uppercase grey  with_padding">Bank Account:</span>
                                            <span>
                                                {(props.accountInfo !== undefined && props.accountInfo.account_name !== undefined) ? props.accountInfo.account_name : ''} <br />
                                                {(props.accountInfo !== undefined && props.accountInfo.account_number !== undefined) ? props.accountInfo.account_number : ''} <br />
                                                {(props.accountInfo !== undefined && props.accountInfo.bank_name !== undefined) ? props.accountInfo.bank_name : ''} <br />
                                                {(props.accountInfo !== undefined && props.accountInfo.ifsc_code !== undefined) ? props.accountInfo.ifsc_code : ''} <br />
                                            </span>
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

export default BasicInfo;