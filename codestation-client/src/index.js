import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import zhCN from 'antd/locale/zh_CN';
import {ConfigProvider} from "antd";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ConfigProvider locale={zhCN}>
                <App/>
            </ConfigProvider>
        </BrowserRouter>
    </React.StrictMode>
);
