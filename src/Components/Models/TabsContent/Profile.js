import React from 'react';
import Constants from '../../../Config/Constants';

const profile = (props) => {
    return (
        <div className="item-content .about-content">
            <h2 className="big topmargin_0 bottommargin_30">
                About {props.name}
            </h2>
            <p>Basic Profile</p>
            <div className="row">
                <div className="col-sm-6">
                    <ul className="list1 no-bullets">
                        <li>
                            <i className="highlight rt-icon2-phone5"></i>
                            <span className="grey">Age:</span>
                            {props.age}(Yrs)
                        </li>
                        <li>
                            <i className="highlight rt-icon2-pen"></i>
                            <span className="grey">Gender:</span>
                            {Constants.genderText[props.gender]}
                        </li>
                    </ul>
                </div>
                <div className="col-sm-6">
                    <ul className="list1 no-bullets">
                        <li>
                            <i className="highlight rt-icon2-mail"></i>
                            <span className="grey">Country:</span>
                            India
                        </li>
                        <li>
                            <i className="highlight rt-icon2-world"></i>
                            <span className="grey">Rating:</span>
                            <span>
                                <span className="fa fa-star checked"></span>
                                <span className="fa fa-star checked"></span>
                                <span className="fa fa-star checked"></span>
                                <span className="fa fa-star"></span>
                                <span className="fa fa-star"></span>
                            </span>    
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    ) 
}

export default profile;