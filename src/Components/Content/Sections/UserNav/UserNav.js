import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Aux from '../../../../hoc/Aux';
import authModel from '../../../../ApiManager/auth';
import { AppContext } from '../../../../Context';

function UserNav() {

    const [isCustomerLogin, setisCustomerLogin] = useState(false);
    const [isLoggedIn, setisLoggedIn] = useState(false);

    useEffect(() => {
        let authToken = authModel.getAuthToken();
        if (authToken) {
            setisLoggedIn(true);
            setisCustomerLogin(authModel.isCustomerLogin());
        }

    }, [isLoggedIn])


    return (
        <div className="dropdown-menu topSignupNav" aria-labelledby="tab" id="tab">
            <AppContext.Consumer>
                {
                    (contextState) => {
                        return (
                            (!contextState.stateData.authUser) ?
                                <Aux>
                                    <ul>
                                        <li> <Link to="/registration/user"> SignUp </Link></li>
                                        <li> <Link to="/registration/model"> SignUp as Model </Link></li>
                                        <li> <Link to="/login"> Login </Link></li>
                                    </ul>
                                </Aux> :

                                (isCustomerLogin) ?
                                    <Aux>
                                        <ul>
                                            <li><Link to="/Profile"> Manage Profile </Link></li>
                                            <li><Link to="/logout"> Logout </Link></li>
                                        </ul>
                                    </Aux>
                                    :

                                    <Aux>
                                        <ul>
                                            <li><Link to="/Profile"> Manage Profile </Link></li>
                                            <li><Link to="/gallery"> Manage Gallery </Link></li>
                                            <li><Link to="/myvideos"> Manage Videos </Link></li>
                                            <li><Link to="/logout"> Logout </Link></li >
                                        </ul>
                                    </Aux >
                        )
                    }
                }
            </AppContext.Consumer >
        </div >
    )
}

export default UserNav