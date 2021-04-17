import axios from 'axios';
import * as endpoints from '../config/config';


export const logInService = async (data) => {
    try {
        let res = await axios.post(endpoints.LOGIN, data)
        return res;
    } catch (error) {
        console.error(error);
    }
}