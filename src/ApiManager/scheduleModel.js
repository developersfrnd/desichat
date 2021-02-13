import Constants from '../Config/Constants';
import ApiCall from './ApiCall'
import userModel from './user'

const scheduleModel = {

    getSchedules: (paramObj={}) => {
        return ApiCall.get(`schedules`, {...paramObj,headers:{Authorization: `Bearer ${userModel.authToken()}`}});
    },

    getSchedule: (scheduleId) => {
        return ApiCall.get(`schedules/${scheduleId}`, {headers:{Authorization: `Bearer ${userModel.authToken()}`}});
    },

    postSchedule: (data) => {
        return ApiCall.post('schedules',data,{headers:{Authorization: `Bearer ${userModel.authToken()}`}})
    },

    updateSchedule: (data) => {
        
        data['_method'] = 'PUT';
        let scheduleId = data.scheduleId;
        delete data.scheduleId;

        return ApiCall.post(`schedules/${scheduleId}`,data,{headers:{Authorization: `Bearer ${userModel.authToken()}`}})
    }
}

export default scheduleModel;

