import React from 'react';
import {Modal} from "antd";

function LoginForm(props) {
    const handleOK = () => {
        props.closeModal();
    }

    return (
        <>
            <Modal title="Basic Modal" open={props.isShow} onOk={handleOK} onCancel={props.closeModal}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    );
}

export default LoginForm;
