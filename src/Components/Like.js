import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import authModel from '../ApiManager/auth';
import usersModel from '../ApiManager/user';

function Like(props) {

    const [isAuthenticated, setisAuthenticated] = useState(false)
    const [inProgress, setinProgress] = useState(false)
    const [isLiked, setisLiked] = useState(props.isLiked)
    const [isCustomerLogin, setisCustomerLogin] = useState(false);

    useEffect(() => {
        let authToken = authModel.getAuthToken();
        if (authToken) {
            setisCustomerLogin(authModel.isCustomerLogin());
            setisAuthenticated(true);
        }else{
            setisAuthenticated(false);
        }

    }, [isAuthenticated, isLiked])

    const likeEventHandler = (model_id) => {
        setinProgress(true);
        usersModel.postLike({'model_id':model_id})
            .then((res) => {
                setisLiked(!isLiked);
                toast.success(res.message);
            })
            .catch((error) => {
                toast.error(error.message)
            })

            setinProgress(false);
    }

    return (
        <Link onClick={() => likeEventHandler(props.model_id)} className="addTofavourites">
            {
                (!isAuthenticated || !isCustomerLogin) ? '' : 
                    (isLiked) ? <img src="images/heart-filled.svg" alt="" /> : <img src="images/heart.svg" alt="" />

            }
            
        </Link>
    )
}

export default Like
