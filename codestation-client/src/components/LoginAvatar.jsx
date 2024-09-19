import React from 'react';
import {useSelector} from "react-redux";
import {Avatar, Button, Image, List, Popover} from "antd";

function LoginAvatar(props) {

    const user = useSelector(state => state.user);
    console.log(user);

    if (user.isLogin) {
        const content = (
            <List
                dataSource={["个人中心", "退出登录"]}
                size="large"
                renderItem={item => (
                    <List.Item style={{cursor: "pointer"}}>{item}</List.Item>
                )}
            />
        );
        return (
            <Popover content={content}>
                <Avatar style={{cursor: "pointer"}} size="large" src={<Image src={user.userInfo?.avatar} preview={false}/>}/>
            </Popover>
        );
    } else {
        // 没有登录
        return (
            <>
                <Button type="primary" size="large" onClick={props.loginHandle}>注册/登录</Button>
            </>
        );
    }
}

export default LoginAvatar;
