import axios from 'axios';
import { TITLE_ENDPOINT } from '@config';

export const getAllWithFilter = async (title, page, size, filter) => {
    let res;
    try {
        res = await axios.get(resolveEndpoint(title), { params: { page, size, title: filter } });
        return res.data;
    } catch (error) {
        console.log(error);

    }
}

export const getById = async (title, id) => {
    let res;
    try {
        res = await axios.get(`${resolveEndpoint(title)}/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

const resolveEndpoint = (title) => {
    return TITLE_ENDPOINT.find(element => element.title == title).endpoint;
}