import React, { Component } from 'react'
import BaseComponent from '../../Containers/BaseComponent';
import { AppContext } from '../../Context';
import { Redirect } from 'react-router';
import Loading from '../../Components/Loaders/Loading';
import usersModel from '../../ApiManager/user';

class Authenticated extends BaseComponent {

    static contextType = AppContext;
    
    constructor(props) {
        super(props);
        this.state={
            loading:true,
            isAuthenticated:usersModel.authToken()
        }
    }
    
    componentDidMount(){
        if(this.state.isAuthenticated && !this.context.stateData.authUser){
            usersModel.getAuthUser()
                .then(response => {
                    this.setContextState({authUser:response.data.data});
                    this.setState({loading:false});
                })
                .catch(error => {
                    this.showMessage(error)
                })
        }else{
            this.setState({loading:false});
        }
    }
    
    render() {
        return (
            (this.state.loading) ? <Loading /> :
            (this.state.isAuthenticated) ? this.props.children : <Redirect to="/login" />
        )
    }
}

export default Authenticated;