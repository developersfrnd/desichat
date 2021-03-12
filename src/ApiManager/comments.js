import ApiCall from './ApiCall'
import userModel from './user'

const commentModel = {

    postComment: (data) => {
        return ApiCall.post('comments',data,{headers:{Authorization: `Bearer ${userModel.authToken()}`}})
    },
    getComments: (paramObj={}) => {
        return ApiCall.get('comments',{...paramObj,headers:{Authorization: `Bearer ${userModel.authToken()}`}})
    },
}

export default commentModel;