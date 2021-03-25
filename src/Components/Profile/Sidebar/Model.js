import React, { useEffect, useContext } from 'react'
import Aux from '../../../hoc/Aux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { AppContext } from '../../../Context';
import { useHistory } from "react-router-dom";

function Model(props) {

    const appContext = useContext(AppContext);
    const history = useHistory()
    
    console.log(appContext);
    const checkCharges = () => {
        if(appContext.stateData.authUser.charges !== undefined){
            history.push('/chatboard')
        }else{
            toast.error('Please add your bank account and charge / min to start chat.');
        }
    }
    
    return (
        <Aux>
            <div className="with_background with_padding">
                <div className="widget widget_banner">
                    <h3 className="widget-title"></h3>
                    <div className="vertical-item content-absolute ds">
                        <div className="item-media">
                            <img src={props.profilePicture} alt="" />
                        </div>
                        <div className="media-links">
                            <a href="#" className="abs-link"></a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="with_background with_padding">
                <div className="widget widget_categories">
                    <ul>
                        <li>
                            <Link to="/charges">Account & Charges</Link>
                            <span className="grey"></span>
                        </li>
                        <li>
                            <Link to="/profile-edit">Edit Basic Info</Link>
                            <span className="grey"></span>
                        </li>
                        <li>
                            <Link to="/personal">Edit Personal Info</Link>
                            <span className="grey"></span>
                        </li>
                        <li>
                            <Link to="/questionnire">Edit Questionnire</Link>
                            <span className="grey"></span>
                        </li>
                        <li>
                            <Link to="/add-photos">Add Photos</Link>
                            <span className="grey"></span>
                        </li>
                        <li>
                            <Link to="/gallery">My Photos</Link>
                            <span className="grey"></span>
                        </li>
                        <li>
                            <Link to="/add-videos">Add Video</Link>
                            <span className="grey"></span>
                        </li>
                        <li>
                            <Link to="/myvideos">My Videos</Link>
                            <span className="grey"></span>
                        </li>
                        <li>
                            <Link to="/add-edit-schedule">Manage Schedule</Link>
                            <span className="grey"></span>
                        </li>
                        <li>
                            <Link onClick={() => checkCharges()}>Start Chat</Link>
                            <span className="grey"></span>
                        </li>
                    </ul>
                </div>
            </div>
        </Aux>
    )
}

export default Model
