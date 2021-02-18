import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Constants from '../../Config/Constants';
import { AppContext } from '../../Context';
import ChatBoard from './Sidebar/ChatBoard';
import Customer from './Sidebar/Customer';

const ModelSidebar = () => {

    const ContextData = useContext(AppContext)
    const authUser = ContextData.stateData.authUser;

    const profilePicture = (authUser.profilePicture) ? authUser.profilePicture : "img/no-image.jpg"
    
    return (
        <aside className="col-sm-5 col-md-4 col-lg-4 col-sm-pull-7 col-md-pull-8 col-lg-pull-8">
            { (authUser.role == Constants.roles.model) ? <ChatBoard profilePicture={profilePicture} /> : <Customer creditPoints={authUser.creditPoints} /> }
        </aside>
    );
};

export default ModelSidebar;