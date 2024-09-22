import React from 'react';
import {Navigate, useRoutes} from "react-router";
import Issues from "../pages/Issues";
import Books from "../pages/Books";
import Interviews from "../pages/Interviews";

function Router(props) {
    return useRoutes([
        {
            path: "/issues",
            element: <Issues showLoginModal={props.showLoginModal}/>
        },
        {
            path: "/books",
            element: <Books/>
        },
        {
            path: "/interviews",
            element: <Interviews/>
        },
        {
            path: "/",
            element: <Navigate replace to="/issues"/>
        }
    ])
}

export default Router;
