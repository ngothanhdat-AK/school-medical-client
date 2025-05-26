import axios from 'axios';
const axiosNoAuth = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  
    headers: {
        'Content-Type': 'application/json',
    }
  
});

const axiosWithAuth = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})
axiosWithAuth.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export { axiosNoAuth, axiosWithAuth };