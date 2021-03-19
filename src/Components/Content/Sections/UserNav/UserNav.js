import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'
import Constants from '../../../../Config/Constants';
import { AppContext } from '../../../../Context';

function UserNav() {

    const appContext = useContext(AppContext)
    const [isAuthenticated, setisAuthenticated] = useState(false);
    const [isCustomerLogin, setisCustomerLogin] = useState(false);
    
    useEffect(() => {
        setisAuthenticated(appContext.stateData.isAuthenticated);
		let isCustomerLogin = (appContext.stateData.isAuthenticated && appContext.stateData.authUser.role == Constants.roles.user) ? true : false;
        setisCustomerLogin(isCustomerLogin);

    }, [appContext])


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