import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-327f8.firebaseio.com/'
});

export default instance;