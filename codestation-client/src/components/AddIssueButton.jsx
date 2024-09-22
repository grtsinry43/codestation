import React from 'react';
import {Button} from "antd";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";

/**
 * 添加问题
 * @param props
 * @returns {Element}
 * @constructor
 */
function AddIssueButton(props) {
    const isLogin = useSelector(state => state.user.isLogin);
    const navigate = useNavigate();
    const addIssueHandle = () => {
        //获取是否登录，登录后跳转到提问页面
        if (isLogin) {
            navigate("/addIssue");
        } else {
            props.showLoginModal();
        }
    }
    return (
        <Button type="primary"
                style={{
                    marginBottom: "20px",
                    width: "100%",
                }}
                onClick={addIssueHandle}
        >
            我要提问
        </Button>
    );
}

export default AddIssueButton;
