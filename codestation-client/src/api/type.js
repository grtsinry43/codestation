import request from "./request";

/**
 * 获取文章类型列表
 * @returns {Promise<AxiosResponse<any>> | *}
 */
export function getType() {
    return request({
        url: "/api/type",
        method: "GET"
    });
}
