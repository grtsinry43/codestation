import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import zhCN from 'antd/locale/zh_CN';
import {ConfigProvider} from "antd";

import store from "./redux/store";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ConfigProvider locale={zhCN} theme={{
                token: {
                    borderRadius: 0,
                }
            }}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </ConfigProvider>
        </Provider>
    </React.StrictMode>
);
