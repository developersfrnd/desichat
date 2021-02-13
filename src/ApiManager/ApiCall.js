import Constants from '../Config/Constants';
import axios from 'axios';

export default axios.create({
    baseURL: Constants.apiEndPoint,
    responseType: "json",
});