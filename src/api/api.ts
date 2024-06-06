import axios from 'axios';

// const API_URL = 'https://jsonplaceholder.typicode.com';
const API_URL = 'https://dummyjson.com/users';

export const fetchUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};