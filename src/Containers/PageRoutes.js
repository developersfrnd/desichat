import React, { Component } from 'react';
import { Route ,Link, Switch, Redirect } from 'react-router-dom'
import Registration from '../Components/Forms/Registration/Registration'
import Login from '../Components/Forms/Login/Login'
import Home from '../Components/Content/Home';
import PersonalInfo from '../Components/Forms/PersonalInfo/PersonalInfo';
import Questionnire from '../Components/Forms/Questionnire/Questionnire';
import Model from '../Containers/Lists/Models/Model'
import Photos from '../Containers/Lists/Gallery/Photos';
import AddPhotos from '../Components/Forms/Gallery/AddPhotos';
import Logout from '../Containers/Logout';
import PageNotFound from '../Components/PageNotFound';
import Profile from '../Containers/Profile/Profile';
import BaseComponent from './BaseComponent';
import AddVideos from '../Components/Forms/Gallery/AddVideos';
import Videos from './Videos/Videos';
import MyVideos from './Videos/MyVideos'; 
import Authenticated from '../hoc/Auth/Authenticated';
import Faq from '../Components/Faq';
import ProfileEdit from '../Components/Forms/Profile/ProfileEdit';
import Contact from '../Components/Forms/Contact/Contact';
import Content from '../Components/Content/Content';
import Payment from '../Components/Forms/Payment/Payment';
import Orders from '../Components/Orders/Orders';
import AddEditSchedule from '../Components/Forms/Schedules/AddEditSchedule';
import Bookings from '../Components/Bookings/Bookings';
import Board from "../Components/Chat/Board";
import AccountCharges from "../Components/Forms/Account-charges/AccountCharges"
import ForgotPassword from '../Components/Forms/ForgotPassword/ForgotPassword';
import EmailVerification from '../Components/Forms/EmailVerification/EmailVerification';


class PageRoutes extends BaseComponent {
    
    constructor(){
        super();
    }
    
    render() {
        return (
            <Switch>
                
                <Route path="/" exact component={Home} />
                <Route path="/registration/:userType"  component={Registration} />
                <Route path="/login" exact component={Login} />
                <Route path="/videos" exact component={Videos} />

                <Route path="/model/:userId" exact component={Model} />
                <Route path="/content/:slug" exact component={Content} />
                <Route path="/faq" exact component={Faq} />
                <Route path="/contact" exact component={Contact} />
                <Route path="/forgotpassword" exact component={ForgotPassword} />
                <Route path="/verify-email" exact component={EmailVerification} />
                
                <Authenticated>
                    <Route path="/personal" exact component={PersonalInfo} />
                    <Route path="/questionnire" exact component={Questionnire} />
                    <Route path="/profile-edit" exact component={ProfileEdit} />
                    <Route path="/gallery" exact component={Photos} />
                    <Route path="/add-photos" exact component={AddPhotos} />
                    <Route path="/add-videos" exact component={AddVideos} />
                    <Route path="/myvideos" exact component={MyVideos} />
                    <Route path="/profile" exact component={Profile} />
                    <Route path="/chatboard" exact component={Board} />	
                    <Route path="/logout" exact component={Logout} />
                    
                    <Route path="/payment" exact component={Payment} />
                    <Route path="/orders" exact component={Orders} />
                    <Route path="/bookings" exact component={Bookings} />
                    <Route path="/charges" exact component={AccountCharges} />
                    
                    <Route path="/add-edit-schedule" exact component={AddEditSchedule} />
                </Authenticated>    

                <Route component={PageNotFound} />    
            </Switch>
        );
    }
}

export default PageRoutes;