import React, { Component } from 'react'
import { AppContext } from '../Context' 
import Aux from '../hoc/Aux';
import { Redirect } from 'react-router';
import userModel from '../ApiManager/user'


class BaseComponent extends Component {
    
    static contextType = AppContext;
    constructor(){
        super()
    }

    axiosConfig = () => {
        let config = {};
        if(this.context.stateData.authUser){
            config = {...config, headers: {Authorization: `Bearer ${this.context.stateData.authUser.token}`}}
        }

        return config;
    }

    pageRedirection = () => {
        let redirect = null;

        if(this.context.stateData.redirect){
            redirect = <Redirect to={this.context.stateData.redirect} />
            this.setContextState({redirect:null})
        }

        return redirect;
    }

    setLocalStorage = (obj = {}) => {
        for(const property in obj){
            localStorage.setItem(property,obj[property])
        }    
    }

    setTokenToLocalStorage = (token) => {
        //, 'tokenValidSince': new Date().addHours(1)
        this.setLocalStorage({'token':token});
    }

    getLocalStorage = (key) => {
        return localStorage.getItem(key);
    }

    setContextState = (newState = this.context.state) => {
        this.context.handleEvent({
                ...this.context.state,
                authUser:(newState.hasOwnProperty('authUser')) ? newState.authUser : this.context.stateData.authUser,
                loading:(newState.hasOwnProperty('loading')) ? newState.loading : this.context.stateData.loading,
                redirect:(newState.hasOwnProperty('redirect')) ? newState.redirect : this.context.stateData.redirect,
                flashMessage:(newState.hasOwnProperty('flashMessage')) ? newState.flashMessage : this.context.stateData.flashMessage,
            })

            if(newState.hasOwnProperty('flashMessage') && newState.flashMessage){
                setTimeout(() => {
                    this.context.handleEvent({
                        flashMessage:null        
                    })      

                }, 4000);
            }
        
    }

    showMessage = (error) => {
        let errorMessage = null;
        if (error.response) {
            let ermsg = error.response.data.errors;
            if(typeof ermsg === 'object' && ermsg !== null){
                errorMessage = ermsg[Object.keys(ermsg)[0]][0];
            }else{
                errorMessage = error.response.data.errors
            }
          } else if (error.request) {
            errorMessage = error.request;
          } else {
            errorMessage = error.message;
          }
        
        console.log(errorMessage,"error.response",error.response)  
        this.setContextState({flashMessage:errorMessage,loading:false})
    }

    render(){
        return (
            <Aux>
                {this.props.children}
            </Aux>
        )
            
    }
}

export default BaseComponent
