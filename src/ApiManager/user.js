import Constants from '../Config/Constants';
import ApiCall from './ApiCall'
import authModel from './auth';

const usersModel = {

    authToken : () => {
        return authModel.getAuthToken();
    },    

    getAuthUser: () => {
        return (authModel.getAuthToken()) ? ApiCall.get(`user`, {headers:{Authorization: `Bearer ${authModel.getAuthToken()}`}}) : null;
    },
    
    getUsers: (paramObj={}) => {
        return ApiCall.get(`users`, {...paramObj,headers:{Authorization: `Bearer ${authModel.getAuthToken()}`}});
    },

    getUser: (userId) => {
        return ApiCall.get(`users/${userId}`, {headers:{Authorization: `Bearer ${authModel.getAuthToken()}`}});
    },

    isEmailAvailable: (data) => {
        return ApiCall.post(`isEmailAvalaible`,data);
    },

    forgotpasswordtoken: (data) => {
        return ApiCall.post(`forgotpasswordtoken`,data);
    },

    setPassword: (data) => {
        return ApiCall.post(`setpassword`,data);
    },

    loginUser: (data) => {
        return ApiCall.post('login',data)
    }, 
    postUser: (data) => {
        return ApiCall.post('signup',data)
    },
    verifyUser: (data) => {
        return ApiCall.post('verify',data)
    },
    resend: (data) => {
        return ApiCall.post('user/resend',data)
    },
    getVerificationCode: (data) => {
        return ApiCall.post('user/resend',data)
    },
    contactus:(data) => {
        return ApiCall.post(`contactus`, data)
    },

    updateUser: (data) => {
        let user_id = data.id;
        delete data.id;
        return ApiCall.post(`users/${user_id}`, data, {headers:{Authorization: `Bearer ${authModel.getAuthToken()}`}})
    },
    purchaseVideo: (data) => {
        return ApiCall.post(`user/purchaseVideo`,data, {headers:{Authorization: `Bearer ${authModel.getAuthToken()}`}})
    },
    getBroadcastInfoToCreate: () => {
        return ApiCall.get(`user/infoToCreateBroadcast`, {headers:{Authorization: `Bearer ${authModel.getAuthToken()}`}})
    },
    startbroadcast: (sessionId) => {
        return ApiCall.get(`user/startbroadcast/${sessionId}`, {headers:{Authorization: `Bearer ${authModel.getAuthToken()}`}})
    },
    onlineuser: () => {
        return ApiCall.get(`user/online`, {headers:{Authorization: `Bearer ${authModel.getAuthToken()}`}})
    },
    offlineuser: () => {
        return ApiCall.get(`user/offline`, {headers:{Authorization: `Bearer ${authModel.getAuthToken()}`}})
    },
    postLike: (data) => {
        return ApiCall.post(`likes`, data, {headers:{Authorization: `Bearer ${authModel.getAuthToken()}`}})
    },
    checkUserCoin: (data) => {
        return ApiCall.post(`checkusercoin`, data, {headers:{Authorization: `Bearer ${authModel.getAuthToken()}`}})
    },
    reduceUserCoin: (data) => {
        return ApiCall.post(`reduceusercoin`, data, {headers:{Authorization: `Bearer ${authModel.getAuthToken()}`}})
    },
    addUpdateAccount: (data) => {
        return ApiCall.post(`account`, data, {headers:{Authorization: `Bearer ${authModel.getAuthToken()}`}})
    },
    getAccountInfo: (data) => {
        return ApiCall.get(`account`, {headers:{Authorization: `Bearer ${authModel.getAuthToken()}`}})
    },
}

export default usersModel;

