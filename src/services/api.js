import axios from 'axios';

export default axios.create({
    baseURL: 'https://beta-store-product-api.herokuapp.com'
})