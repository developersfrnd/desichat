import Constants from '../Config/Constants';
import ApiCall from './ApiCall'
import userModel from './user'

const photoModel = {

    getPhotos: (paramObj={}) => {
        return ApiCall.get(`galleries`, {...paramObj,headers:{Authorization: `Bearer ${userModel.authToken()}`}});
    },
    getUserPhotos: (userId,paramObj={}) => {
        return ApiCall.get(`galleries/${userId}`, {...paramObj,headers:{Authorization: `Bearer ${userModel.authToken()}`}});
    },
    postPhotos: (data) => {
        return ApiCall.post('galleries',data,{headers:{Authorization: `Bearer ${userModel.authToken()}`}})
    }
}

export default photoModel;

