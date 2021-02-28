import React, { Component } from 'react';
import { Redirect } from 'react-router';
import usersModel from '../../ApiManager/user';
import BaseComponent from '../../Containers/BaseComponent';
import { AppContext } from '../../Context';
import Loading from '../Loaders/Loading';
import ModelSidebar from '../Profile/ModelSideBar';
import PromptPopUp from './PromptPopUp';
import PublicChat from './PublicChat';
import VideoChat from './VideoChat';
import io from "socket.io-client"
import Constants from '../../Config/Constants';
//const EndPoint = "https://chatserver.desisexichat.com"
const EndPoint = Constants.chatServer
class Board extends BaseComponent {
    
    static contextType = AppContext;
    
    constructor() {
        super()
        this.state = {
            user: {},
            loading:true,
            isDirtystatus:false
        }
    }    

    componentDidMount(){
        usersModel.getAuthUser()
            .then( response => {
                    if(!response.data.data.is_online){
                        usersModel.onlineuser()
                    }
                    this.setState({
                    ...this.state,
                    user: response.data.data,
                    loading:false,
                    isDirtystatus:true
                })
			})
			.catch((error) => { 
				this.showMessage(error);
			});
    }

    render() {
        const socket = io.connect(EndPoint, {transports: [ 'websocket' ]})
        return (
            (this.state.loading) ? <Loading /> :
            <section className="ds section_padding_70 section_padding_bottom_60 columns_padding_25">
                <div className="container">
					<div className="row">
                        <div className="col-sm-7 col-md-8 col-lg-8 col-sm-push-5 col-md-push-4 col-lg-push-4">
                            <div className="row">
                                <PublicChat 
                                    socket={socket}
                                    modelname={this.state.user.name} 
                                    modelroom={this.state.user.id}  
                                />
                                <VideoChat
                                    socket={socket}
                                    modelname={this.state.user.name} 
                                    modelroom={this.state.user.id}
                                />
                            </div>    
                        </div> 
                        <ModelSidebar profilePicture={this.state.user.profilePicture} userRole={this.state.user.role}  />                       
					</div>
				</div>
                <PromptPopUp isDirtystatus = {this.state.isDirtystatus} modelroom={this.state.user.id} socket={socket} />
            </section>
        )
    }
}

export default Board;