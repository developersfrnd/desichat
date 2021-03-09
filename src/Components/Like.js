import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import authModel from '../ApiManager/auth';
import usersModel from '../ApiManager/user';

function Like() {

    const [isAuthenticated, setisAuthenticated] = useState(false)
    const [isLiked, setisLiked] = useState(false)
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

    const likeEventHandler = () => {
        alert()
    }

    return (
        <Link onClick={likeEventHandler} className="addTofavourites">
            {
                (!isAuthenticated || !isCustomerLogin) ? '' : 
                    (isLiked) ? <img src="images/heart-filled.svg" alt="" /> : <img src="images/heart.svg" alt="" />

            }
            
        </Link>
    )
}

export default Like
