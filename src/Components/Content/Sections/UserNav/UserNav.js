import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import authModel from '../../../../ApiManager/auth';
import Constants from '../../../../Config/Constants';

function UserNav() {

    const userObj = authModel.getAuthUserObj();
    const isAuthenticated = (authModel.getAuthToken()) ? true : false;
    const isCustomerLogin = (userObj && userObj.role == Constants.roles.user) ? true : false;

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