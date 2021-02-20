import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Aux from '../../../../hoc/Aux';
import authModel from '../../../../ApiManager/auth';

function UserNav() {

    const [isCustomerLogin, setisCustomerLogin] = useState(false);
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [minWidth, setminWidth] = useState('430px');

    useEffect(() => {
        let authToken = authModel.getAuthToken();
        if(authToken){
            setminWidth('500px');
            setisLoggedIn(true);
            setisCustomerLogin(authModel.isCustomerLogin());
        }
        
    }, [])


    return (
        <div className="dropdown-menu" aria-labelledby="tab" id="tab" style={{fontWeight:'400', fontSize:'15px', paddingLeft:'20px',minWidth:minWidth,boxShadow:'2px 2px 4px 0px #575757;z-index: 999999'}}>
            {
                (!isLoggedIn) ?
                    <Aux>
                        <Link to="/registration/user"> SignUp </Link>&nbsp;|&nbsp;
                        <Link to="/registration/model"> SignUp as Model </Link>&nbsp;|&nbsp;
                        <Link to="/login"> Login </Link>
                    </Aux> : 
                    
                    (isCustomerLogin) ?
                    <Aux>
                        <Link to="/Profile"> Manage Profile </Link>&nbsp;|&nbsp;
                        <Link to="/logout"> Logout </Link>
                    </Aux>
                    :

                    <Aux>    
                        <Link to="/Profile"> Manage Profile </Link>&nbsp;|&nbsp;
                        <Link to="/gallery"> Manage Gallery </Link>&nbsp;|&nbsp;
                        <Link to="/myvideos"> Manage Videos </Link>&nbsp;|&nbsp;
                        <Link to="/logout"> Logout </Link>
                    </Aux>    
            }
            
            </div>
    )
}

export default UserNav