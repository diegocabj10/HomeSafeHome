export const API_URL = 'http://192.168.0.113:8080/api';

export const AUTHENTICATIONS_LOGIN = `${API_URL}/authentications/login`;

export const TITLE_ENDPOINT = [
    {
        key: 'claims',
        title: `Reclamos`,
        detailTitle:`Reclamo`,
        endpoint: `${API_URL}/claims`,
    },
    {
        key: 'devices',
        title: `Dispositivos`,
        detailTitle:`Dispositivo`,
        endpoint: `${API_URL}/devices`,
    },
    {
        key: 'notices',
        title: `Avisos`,
        detailTitle:`Aviso`,
        endpoint: `${API_URL}/notices`,
    },
    {
        key: 'notifications',
        title: `Notificaciones`,
        detailTitle:`Notificación`,
        endpoint: `${API_URL}/notifications`,
    },
];


export const ACCESS_TOKEN = 'x-access-token';
export const REFRESH_TOKEN = 'x-refresh-token';



