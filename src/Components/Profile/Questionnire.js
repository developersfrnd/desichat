import React from 'react';
import { Link } from 'react-router-dom'

const Questionnire = (props) => {
    return (
        <div className="col-sm-12 bottommargin_40">
            <div className="side-item event-item content-padding with_background">
                <div className="row">
                    <div className="col-md-12">
                        <div className="item-media">
                            <div className="item-content with_padding">
                            <h3 className="entry-title topmargin_0">
                                Questionnire Information  <Link to="/questionnire"><i className="rt-icon2-edit"></i></Link>
                            </h3>	

                            <ul className="media-list">
                                <li className="media">
                                    <div className="media-body">
                                        <span className="bold fontsize_12 text-uppercase grey  with_padding">Categories:</span>
                                        <span>{props.categories}</span>
                                    </div>
                                </li>
                                <li className="media">
                                    <div className="media-body">
                                        <span className="bold fontsize_12 text-uppercase grey  with_padding">Languages:</span>
                                        <span>{props.languages}</span>
                                    </div>
                                </li>
                                <li className="media">
                                    <div className="media-body">
                                        <span className="bold fontsize_12 text-uppercase grey  with_padding">Ethenticity:</span>
                                        <span>{props.ethnicity}</span>
                                    </div>
                                </li>
                                <li className="media">
                                    <div className="media-body">
                                        <span className="bold fontsize_12 text-uppercase grey  with_padding">Body:</span>
                                        <span>{props.body}</span>
                                    </div>
                                </li>
                                <li className="media">
                                    <div className="media-body">
                                        <span className="bold fontsize_12 text-uppercase grey  with_padding">Weight:</span>
                                        <span>{props.weight}</span>
                                    </div>
                                </li>
                                <li className="media">
                                    <div className="media-body">
                                        <span className="bold fontsize_12 text-uppercase grey  with_padding">Height:</span>
                                        <span>{props.height}</span>
                                    </div>
                                </li>
                                <li className="media">
                                    <div className="media-body">
                                        <span className="bold fontsize_12 text-uppercase grey  with_padding">Hair Color:</span>
                                        <span>{props.hairColor}</span>
                                    </div>
                                </li>
                                <li className="media">
                                    <div className="media-body">
                                        <span className="bold fontsize_12 text-uppercase grey  with_padding">Hair Length:</span>
                                        <span>{props.hairLength}</span>
                                    </div>
                                </li>
                                <li className="media">
                                    <div className="media-body">
                                        <span className="bold fontsize_12 text-uppercase grey  with_padding">Eye Color:</span>
                                        <span>{props.eyeColor}</span>
                                    </div>
                                </li>
                                <li className="media">
                                    <div className="media-body">
                                        <span className="bold fontsize_12 text-uppercase grey  with_padding">Orientation:</span>
                                        <span>{props.orientation}</span>
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

export default Questionnire;