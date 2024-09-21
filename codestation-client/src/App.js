import './css/App.css';
import NavHeader from "./components/NavHeader";
import PageFooter from "./components/PageFooter";
import {Layout, message} from "antd";
import Router from "./router";
import LoginForm from "./components/LoginForm";
import {useEffect, useState} from "react";
import {getLoginStatus, getUserById} from "./api/user";
import {useDispatch} from "react-redux";
import {changeLoginStatus, initUserInfo} from "./redux/userSlice";

const {Header, Footer, Content} = Layout;

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => {
        setIsModalOpen(false);
    }
    const loginHandle = () => {
        setIsModalOpen(true);
    }

    const dispatch = useDispatch();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            return;
        }
        // 恢复登录状态
        getLoginStatus().then(res => {
            console.log("登录状态", res);
            if (res.code === 406) {
                console.log("登录过期");
                message.error(res.msg);
            } else {
                // 登录成功
                getUserById(res.data._id).then(res => {
                    dispatch(initUserInfo(res.data));
                    dispatch(changeLoginStatus(true));
                });
            }
        });
    }, [dispatch]);

    return (
        <div className="App">
            <Layout>
                <Header>
                    <NavHeader loginHandle={loginHandle}/>
                </Header>
                <Content className="content">
                    <Router/>
                </Content>
                <Footer className="footer">
                    <PageFooter/>
                </Footer>
                {/*全局登录弹窗*/}
                <LoginForm isShow={isModalOpen} closeModal={closeModal}/>
            </Layout>
        </div>
    );
}

export default App;
