import ApiCall from './ApiCall'
import userModel from './user'

const bookingModel = {

    postBooking: (data) => {
        return ApiCall.post('bookings',data,{headers:{Authorization: `Bearer ${userModel.authToken()}`}})
    },
    getBookings: (paramObj={}) => {
        return ApiCall.get('bookings',{...paramObj,headers:{Authorization: `Bearer ${userModel.authToken()}`}})
    }
}

export default bookingModel;