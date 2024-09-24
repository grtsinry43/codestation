import request from "./request";

export function getIssueByPage(params) {
    return request({
        url: "/api/issue",
        method: "GET",
        params: {
            ...params,
        },
    });
}

export function addIssue(data) {
    return request({
        url: "/api/issue",
        method: "POST",
        data: {
            ...data,
        },
    });
}

