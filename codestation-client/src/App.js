import './css/App.css';
import NavHeader from "./components/NavHeader";
import PageFooter from "./components/PageFooter";
import {Layout} from "antd";
import Router from "./router";
import LoginForm from "./components/LoginForm";
import {useState} from "react";

const {Header, Footer, Content} = Layout;

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => {
        setIsModalOpen(false);
    }
    const openModal = () => {
        setIsModalOpen(true);
    }
    return (
        <div className="App">
            <Layout>
                <Header>
                    <NavHeader />
                </Header>
                <Content className="content">
                    <Router/>
                </Content>
                <Footer className="footer">
                    <PageFooter/>
                </Footer>
                {/*全局登录弹窗*/}
                <LoginForm isShow={isModalOpen} closeModal={closeModal} openModal={openModal}/>
            </Layout>
        </div>
    );
}

export default App;
