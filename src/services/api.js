import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5001/api', // Backend URL (Updated to 5001) (Updated to 5001)
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor to handle errors globally (optional but good practice)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // If 401 Unauthorized, maybe logout (but let AuthContext handle that if possible, or just reject)
        return Promise.reject(error);
    }
);

export default api;
