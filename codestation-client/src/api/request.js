import axios from "axios";

const ins = axios.create({
    timeout: 5000
})

ins.interceptors.request.use((config) => {
    return config
}, (err) => {
    console.log("请求失败", err);
});

ins.interceptors.response.use((res) => {
    return res.data
}, (err) => {
    console.log("响应失败", err);
});

export default ins;
