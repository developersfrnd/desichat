import React from 'react'
import Aux from '../../../hoc/Aux'
import { Link } from 'react-router-dom'

function Customer(props) {
    return (
        <Aux>
            <div className="with_background with_padding">
                <div className="widget widget_banner">
                    <h3 className="widget-title">&nbsp;</h3>
                        
                        <div className="highlight inline-block fontsize_30 bold">{props.creditPoints}</div>
                        <div className="media-links">
                            <a href="#" className="abs-link"></a>
                        </div>
                    
                </div>
            </div>

            <div className="with_background with_padding">
                <div className="widget widget_categories">
                    <h3 className="widget-title"></h3>
                    <ul>
                        <li>
                            <Link to="/profile-edit">Edit Personal Info</Link>
                            <span className="grey"></span>
                        </li>
                        <li>
                            <Link to="/payment">Purchase Credit Points</Link>
                            <span className="grey"></span>
                        </li>
                        <li>
                            <Link to="/orders">Order History</Link>
                            <span className="grey"></span>
                        </li>
                        <li>
                            <Link to="/bookings">Booking History</Link>
                            <span className="grey"></span>
                        </li>
                        <li>
                            <Link to="/myvideos">My Videos</Link>
                            <span className="grey"></span>
                        </li>
                    </ul>
                </div>
            </div>
        </Aux>
    )
}

export default Customer
