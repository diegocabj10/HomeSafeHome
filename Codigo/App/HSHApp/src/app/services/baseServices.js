import axios from 'axios';

export const getAllWithFilter = async (endpoint, page, size, title) => {
    let res;
    try {
        res = await axios.get(endpoint, { params: { page, size, title } });
        return res.data;
    } catch (error) {
        console.log(error);

    }
}