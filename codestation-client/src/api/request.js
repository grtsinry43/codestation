import axios from "axios";

const ins = axios.create({
    timeout: 5000
})

ins.interceptors.request.use((config) => {
    // 取出token
    const token = localStorage.getItem("token");
    // 如果token存在，则添加到请求头
    if (token) {
        config.headers.Authorization = "Bearer " + token;
    }
    console.log(config.headers.Authorization)
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
