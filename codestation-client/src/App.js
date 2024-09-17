import './css/App.css';
import NavHeader from "./components/NavHeader";
import PageFooter from "./components/PageFooter";
import {Layout} from "antd";
import Router from "./router";

const {Header, Footer, Content} = Layout;

function App() {
    return (
        <div className="App">
            <Layout>
                <Header>
                    <NavHeader/>
                </Header>
                <Content className="content">
                    <Router/>
                </Content>
                <Footer className="footer">
                    <PageFooter/>
                </Footer>
            </Layout>
        </div>
    );
}

export default App;
