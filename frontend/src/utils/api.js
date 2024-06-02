import axios from 'axios';

const API_URL = 'https://grad-sync-backend.vercel.app/api/v1';

export const getAllHandler = async (url) => {
    const res = await axios.get(`${API_URL}/${url}`);
    return res.data;
};

export const getSingleHandler = async (url) => {
    const res = await axios.get(`${API_URL}/${url}`);
    return res?.data?.result;
};

export const updateHandler = async ({ url, body }) => {
    const res = await axios.patch(`${API_URL}/${url}`, body);
    return res?.data?.result;
};

export const updateHandlerPut = async ({ url, body }) => {
    return await axios.put(`${API_URL}/${url}`, body);
};

export const deleteHandler = async (url) => {
    return await axios.delete(`${API_URL}/${url}`);
};

export const sendApplication = async (application) => {
    return await axios.post(`${API_URL}/application/apply`, application, { withCredentials: true });
};