import Constants from "../Config/Constants";

const authModel = {

    getAuthToken: () => {
        let dscAuthObj = sessionStorage.getItem('dsc-auth');
        return (dscAuthObj) ? JSON.parse(dscAuthObj).token : null;
    },    

    getAuthUserObj: () => {
        return (sessionStorage.getItem('dsc-auth')) ? JSON.parse(sessionStorage.getItem('dsc-auth')) : null;
    },

    isModelLogin: function(){
        return this.getAuthUserObj().role === Constants.roles.model;
    },

    isCustomerLogin: function(){
        return this.getAuthUserObj().role === Constants.roles.user;
    },

    setAuthToken: (authUser) => {

        let obj = {'token':authUser.token,'id':authUser.id,'role':authUser.role,'name':authUser.name}
        if(authUser.role == Constants.roles.model){
            obj.charges = authUser.charges
        }

        return sessionStorage.setItem('dsc-auth',JSON.stringify(obj));
    },

    getAuthHeaders: function(){
        return (this.getAuthToken()) ? {Authorization: `Bearer ${this.getAuthToken()}`} : {};
    },
    removeAuthToken: () => {
        return sessionStorage.removeItem('dsc-auth');
    },
}

export default authModel;

