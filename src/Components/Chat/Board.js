import React, { Component } from 'react';
import { Redirect } from 'react-router';
import usersModel from '../../ApiManager/user';
import BaseComponent from '../../Containers/BaseComponent';
import { AppContext } from '../../Context';
import Loading from '../Loaders/Loading';
import Sidebar from '../Profile/Sidebar';
import PromptPopUp from './PromptPopUp';
import PublicChat from './PublicChat';
import VideoChat from './VideoChat';

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
                    if(!response.data.data.room){
                        usersModel.createchatroom()
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
        return (
            (this.state.loading) ? <Loading /> :
            <section className="ds section_padding_70 section_padding_bottom_60 columns_padding_25">
                <div className="container">
					<div className="row">
                        <div className="col-sm-7 col-md-8 col-lg-8 col-sm-push-5 col-md-push-4 col-lg-push-4">
                            <div className="row">
                                <PublicChat 
                                    modelname={this.state.user.name} 
                                    modelroom={this.state.user.room}  
                                />
                                <VideoChat
                                    modelname={this.state.user.name} 
                                    modelroom={this.state.user.room}
                                />
                            </div>    
                        </div> 
                        <Sidebar profilePicture={this.state.user.profilePicture} userRole={this.state.user.role}  />                       
					</div>
				</div>
                <PromptPopUp isDirtystatus = {this.state.isDirtystatus} />
            </section>
        )
    }
}

export default Board;