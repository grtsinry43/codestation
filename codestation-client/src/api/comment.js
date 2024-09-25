import request from "./request";

export function getIssueCommentById(id, params) {
    return request({
        url: `/api/comment/issuecomment/${id}`,
        method: "GET",
        params: {
            ...params,
        },
    });
}
