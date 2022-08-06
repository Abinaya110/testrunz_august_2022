const ApiUrl = require("../../../../ServerApi");
const axios = require("axios");

const axiosResult = axios.get(`${ApiUrl.default}/moreInfoschool`).then(res=>res)

export default axiosResult;

