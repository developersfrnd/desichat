import Constants from "../Config/Constants";
import usersModel from "./user";

const authModel = {

    getAuthToken: () => {
        let dscAuthObj = localStorage.getItem('dsc-auth');
        return (dscAuthObj) ? JSON.parse(dscAuthObj).token : null;
    },    

    getAuthUserObj: () => {
        return (localStorage.getItem('dsc-auth')) ? JSON.parse(localStorage.getItem('dsc-auth')) : null;
    },

    isModelLogin: function(){
        return this.getAuthUserObj().role === Constants.roles.model;
    },

    isCustomerLogin: function(){
        return this.getAuthUserObj().role === Constants.roles.user;
    },

    setAuthToken: (authUser) => {

        let obj = {'token':authUser.token,'id':authUser.id,'role':authUser.role,'name':authUser.name}
        return localStorage.setItem('dsc-auth',JSON.stringify(obj));
    },

    getAuthHeaders: function(){
        return (this.getAuthToken()) ? {Authorization: `Bearer ${this.getAuthToken()}`} : {};
    },
    removeAuthToken: () => {
        return localStorage.removeItem('dsc-auth');
    },
}

export default authModel;

