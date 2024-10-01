import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Button, Image, List, Popover} from "antd";
import {changeLoginStatus, clearUserInfo} from "../redux/userSlice";
import {useNavigate} from "react-router";

function LoginAvatar(props) {
    const navigate = useNavigate();

    const user = useSelector(state => state.user);
    console.log(user);
    const dispatch = useDispatch();

    const listClickHandle = (item) => {
        if (item === "退出登录") {
            localStorage.removeItem("token");
            dispatch(changeLoginStatus(false));
            dispatch(clearUserInfo());
            window.location.reload();
        } else {
            navigate("/personal");
        }
    }

    if (user.isLogin) {
        const content = (
            <List
                dataSource={["个人中心", "退出登录"]}
                size="large"
                renderItem={item => (
                    <List.Item onClick={() => listClickHandle(item)} style={{cursor: "pointer"}}>{item}</List.Item>
                )}
            />
        );
        return (
            <Popover content={content}>
                <Avatar style={{cursor: "pointer"}} size="large"
                        src={<Image src={user.userInfo?.avatar} preview={false}/>}/>
            </Popover>
        );
    } else {
        // 没有登录
        return (
            <>
                <Button type="primary" size="large" onClick={props.loginHandle}> 注册 / 登录 </Button>
            </>
        );
    }
}

export default LoginAvatar;
