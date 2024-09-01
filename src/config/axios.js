import axios from "axios";

const axiosApi=axios.create({
    baseUrl:process.env.REACT_APP_SERVER_DOMAIN
})

axiosApi.defaults.withCredentials=true;
export default axiosApi