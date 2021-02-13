import ApiCall from './ApiCall'
import userModel from './user'

const VideoChatSessionModel = {

    postVideoChat: (data) => {
        return ApiCall.post('videoChatSessions',data,{headers:{Authorization: `Bearer ${userModel.authToken()}`}})
    },
}

export default VideoChatSessionModel;