import React, { useState, useEffect } from 'react';
import Constants from '../../Config/Constants';
import { AppContext } from '../../Context';
import Model from './Sidebar/Model';
import Customer from './Sidebar/Customer';
import { toast } from 'react-toastify';
import usersModel from '../../ApiManager/user';

const Sidebar = () => {

    const [authUser, setauthUser] = useState(null);
    const [profilePicture, setprofilePicture] = useState('img/no-image.jpg')

    useEffect(() => {
        usersModel.getAuthUser()
        .then(user => {
            setauthUser(user.data.data);
            (user.data.data.profilePicture) ? setprofilePicture(user.data.data.profilePicture) : setprofilePicture('img/no-image.jpg')
        })
        .catch(error => {
            toast.error(error);
        })
        
    }, [])
    
    
    return (
        <aside className="col-sm-5 col-md-4 col-lg-4 col-sm-pull-7 col-md-pull-8 col-lg-pull-8">
            {
                (!authUser) ? 'Loading...' : 
                <>
                { (authUser.role == Constants.roles.model) ? <Model profilePicture={profilePicture} /> : <Customer creditPoints={authUser.creditPoints} /> }
                </>
            }
        </aside>
    );
};

export default Sidebar;