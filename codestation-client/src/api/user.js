import request from "./request";

export function getCaptcha() {
    return request.get("/res/captcha");
}

export function checkUserIsExist(loginId) {
    return request.get(`/api/user/userIsExist/${loginId}`);
}

export function registerUser(data) {
    return request.post("/api/user", data);
}

export function loginUser(data) {
    return request.post("/api/user/login", data);
}

export function getUserById(id) {
    return request.get(`/api/user/${id}`);
}

export function getLoginStatus() {
    return request.get("/api/user/whoami");
}
