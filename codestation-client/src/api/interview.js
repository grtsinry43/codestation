import request from "./request";

export function getAllInterviewsByCategory(params) {
    return request({
        url: "/api/interview/interviewTitle",
        method: "GET",
        params: {
            ...params,
        },
    });
}

export function getInterviewById(id) {
    return request({
        url: `/api/interview/${id}`,
        method: "GET",
    });
}
