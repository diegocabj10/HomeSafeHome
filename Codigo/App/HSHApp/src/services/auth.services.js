import axios from 'axios';
import * as endpoints from '../config/endpoints';


export const login = (data) => {
    let res = await axios.post(endpoints.LOGIN, data)
    return res.data;
}