import { create } from 'apisauce';

const api = create({
    baseURL: 'http://192.168.1.35:3001'
});

api.addRequestTransform(req => {
    const TOKEN = localStorage.getItem('@DOMUS:TOKEN');
    if (TOKEN) {
        req.headers['Authorization'] = `Bearer ${TOKEN}`;
    }
});

export default api;
