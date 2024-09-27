import React from 'react';
import {NavLink} from "react-router-dom";
import {Space, Select} from "antd";
import Search from "antd/es/input/Search";
import LoginAvatar from "./LoginAvatar";
import {useNavigate} from "react-router";

function NavHeader(props) {
    const options = [
        {label: '问题', value: 'issue'},
        {label: '书籍', value: 'book'},
    ];

    const [searchOption,setSearchOption] = React.useState('issue');

    const navigate = useNavigate();

    const loginHandle = () => {
        props.loginHandle();
        // console.log("模拟登录");
        // dispatch(login({name: "test", avatar: "https://avatars.githubusercontent.com/u/77447646?v=4"}));
    }

    // useEffect(() => {
    //     setTimeout(() => {
    //         console.log("模拟登录");
    //         dispatch(login({name: "test", avatar: "https://avatars.githubusercontent.com/u/77447646?v=4"}));
    //     }, 3000);
    // }, [dispatch]);

    const onSearch = (value) => {
        if (value) {
            navigate("/search", {
                state: {searchOption, value}
            });
        } else {
            // 搜索框没有内容时，跳转到首页
            navigate("/");
        }
    }

    const onChange = (value) => {
        setSearchOption(value);
    }

    return (
        <div className="headerContainer">
            {/*头部logo*/}
            <div className="logoContainer">
                <div className="logo">
                    <NavLink to="/"/>
                </div>
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
                            onChange={onChange}
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
                <LoginAvatar loginHandle={loginHandle}/>
            </div>
        </div>
    );
}

export default NavHeader;
