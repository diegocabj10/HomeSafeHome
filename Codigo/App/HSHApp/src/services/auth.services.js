import axios from 'axios';
import * as endpoints from '../config/config';


export const logInService = async (data) => {
    let res;
    try {
        console.log(endpoints.LOGIN);
        res = await axios.post(endpoints.LOGIN, data);
        return res;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}