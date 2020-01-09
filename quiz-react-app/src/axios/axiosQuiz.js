import axios from 'axios'
export default axios.create({
    baseURL: 'https://reactqiz.firebaseio.com'
})