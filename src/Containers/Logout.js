import React, { useState, useEffect, useContext } from 'react'
import {AppContext} from '../Context'
import Loading from '../Components/Loaders/Loading'
import { Redirect } from 'react-router'
import authModel from '../ApiManager/auth'

function Logout() {

    const [loading, setloading] = useState(true);
    const authUserContext = useContext(AppContext)

    useEffect(() => {
      authModel.removeAuthToken('token');
      authUserContext.handleEvent({authUser:null})  
      setloading(false);
    }, [loading])

    return (
        (loading) ? <Loading /> : <Redirect to="/login" />
    )
}

export default Logout
