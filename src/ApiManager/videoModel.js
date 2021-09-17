import Constants from '../Config/Constants';
import ApiCall from './ApiCall'
import userModel from './user'

const videoModel = {

    getVideos: (paramObj={}) => {
        return ApiCall.get(`videos`, {...paramObj,headers:{Authorization: `Bearer ${userModel.authToken()}`}});
    },
    getVideo: (videoId) => {
        return ApiCall.get(`videos/${videoId}`, {headers:{Authorization: `Bearer ${userModel.authToken()}`}});
    },
    getMyVideos: (paramObj={}) => {
        return ApiCall.get(`user/videos`, {...paramObj,headers:{Authorization: `Bearer ${userModel.authToken()}`}});
    },

    postVideos: (data) => {
        return ApiCall.post('videos',data,{headers:{Authorization: `Bearer ${userModel.authToken()}`}})
    },
    deleteVideo: (videoId) => {
        return ApiCall.delete(`videos/${videoId}`, {headers:{Authorization: `Bearer ${userModel.authToken()}`}});
    },
}

export default videoModel;

