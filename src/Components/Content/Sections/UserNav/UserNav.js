import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Aux from '../../../../hoc/Aux';
import authModel from '../../../../ApiManager/auth';
import { AppContext } from '../../../../Context';

function UserNav() {

    const [isAuthenticated, setisAuthenticated] = useState(false);
    const [isCustomerLogin, setisCustomerLogin] = useState(false);
    
    useEffect(() => {
        let authToken = authModel.getAuthToken();
        if (authToken) {
            setisCustomerLogin(authModel.isCustomerLogin());
            setisAuthenticated(true);
        }else{
            setisAuthenticated(false);
        }

    }, [isAuthenticated])


    return (
        <div className="dropdown-menu topSignupNav" aria-labelledby="tab" id="tab">
            {
                (!isAuthenticated) ? 
                    <ul>
                        <li> <Link to="/registration/user"> SignUp </Link></li>
                        <li> <Link to="/registration/model"> SignUp as Model </Link></li>
                        <li> <Link to="/login"> Login </Link></li>
                    </ul>
                :
                    
                        (isCustomerLogin) ?
                        <ul>
                            <li><Link to="/Profile"> Manage Profile </Link></li>
                            <li><Link to="/logout"> Logout </Link></li>
                        </ul>

                        :

                        <ul>
                            <li><Link to="/Profile"> Manage Profile </Link></li>
                            <li><Link to="/gallery"> Manage Gallery </Link></li>
                            <li><Link to="/myvideos"> Manage Videos </Link></li>
                            <li><Link to="/logout"> Logout </Link></li >
                        </ul>
                       
            }
        </div >
    )
}

export default UserNav