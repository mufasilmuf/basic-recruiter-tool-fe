import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://recruiter-tool-be.onrender.com/api',
});