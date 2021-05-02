import axios from 'axios';
import { AUTHENTICATIONS_LOGIN } from '@config';


export const logInService = async (data) => {
    let res;
    try {
        res = await axios.post(AUTHENTICATIONS_LOGIN, data);
        return res;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}