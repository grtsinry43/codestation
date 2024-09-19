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
