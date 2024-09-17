import React from 'react';
import {NavLink} from "react-router-dom";
import {Space, Select, Button} from "antd";
import Search from "antd/es/input/Search";

function NavHeader(props) {
    const options = [
        {label: '问题', value: 'issue'},
        {label: '书籍', value: 'book'},
    ];

    const onSearch = value => console.log(value);
    return (
        <div className="headerContainer">
            {/*头部logo*/}
            <div className="logoContainer">
                <div className="logo"></div>
            </div>
            {/*头部导航*/}
            <nav className="navContainer">
                <NavLink to="/" className="navigation">问答</NavLink>
                <NavLink to="/books" className="navigation">书籍</NavLink>
                <NavLink to="/interviews" className="navigation">面试题</NavLink>
                <a href="https://duyi.ke.qq.com/" className="navigation" target="_blank" rel="noreferrer">视频教程</a>
            </nav>
            {/*搜索框*/}
            <div className="searchContainer">
                <Space.Compact>
                    <Select defaultValue="issue"
                            size="large"
                            style={{width: "20%"}}
                            options={options}/>
                    <Search
                        placeholder="搜索问题、书籍"
                        allowClear
                        size="large"
                        enterButton="搜索"
                        onSearch={onSearch}
                        style={{width: "80%"}}
                    />
                </Space.Compact>
            </div>
            <div className="loginBtnContainer">
                <Button type="primary" size="large">注册/登录</Button>
            </div>
        </div>
    );
}

export default NavHeader;
