import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import Loading from '../../Components/Loaders/Loading';
import usersModel from '../../ApiManager/user';

function Authenticated(props) {

    const [isAuthenticated, setisAuthenticated] = useState(false)
    const [loading, setloading] = useState(true);

    useEffect(() => {
        let authToken = usersModel.authToken();
        if(authToken){ 
            setisAuthenticated(true);
        }
        setloading(false); 

    }, [])

    return (
        (loading) ? <Loading /> :
        (isAuthenticated) ? props.children : <Redirect to="/login" />
    )
}

export default Authenticated