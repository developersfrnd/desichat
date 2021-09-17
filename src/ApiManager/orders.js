import ApiCall from './ApiCall'
import userModel from './user'

const orderModel = {

    postPaymentIntent: (data) => {
        return ApiCall.post('orders/paymentIntent',data,{headers:{Authorization: `Bearer ${userModel.authToken()}`}})
    },
    postOrder: (data) => {
        return ApiCall.post('orders',data,{headers:{Authorization: `Bearer ${userModel.authToken()}`}})
    },
    getSettingData: (paramObj={}) => {
        return ApiCall.get('setting',{...paramObj,headers:{Authorization: `Bearer ${userModel.authToken()}`}})
    },
    getOrders: (paramObj={}) => {
        return ApiCall.get('orders',{...paramObj,headers:{Authorization: `Bearer ${userModel.authToken()}`}})
    },
}

export default orderModel;