import RouterConfig from './index.jsx';
import RouteBeforeConfig from "./RouteBeforeConfig";
import {useLocation} from "react-router-dom";
import {useNavigate} from "react-router";
import LoginForm from "../components/LoginForm";
import {useState, useEffect} from "react";

/**
 * 模拟导航守卫，该组件也是一个容器组件，不做任何 JSX 的展示，完全是为了实现一些功能
 */
function RouterBefore(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const currentPath = RouteBeforeConfig.filter(item => item.path === location.pathname)[0];

    useEffect(() => {
        if (!currentPath) {
            navigate("/");
        } else if (currentPath.needLogin && !localStorage.getItem("token")) {
            setIsLoginModalVisible(true);
        }
    }, [currentPath, navigate]);

    const closeHandle = () => {
        setIsLoginModalVisible(false);
        navigate("/");
    }

    if (isLoginModalVisible) {
        return <LoginForm isShow={isLoginModalVisible} closeModal={closeHandle} redirectPath={currentPath}/>;
    }

    return <RouterConfig showLoginModal={props.showLoginModal}/>;
}

export default RouterBefore;
