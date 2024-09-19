import React, {useEffect} from 'react';
import {Modal, Radio, Form, Input, Button, Row, Col, Checkbox, message} from "antd";
import styles from "../css/LoginForm.module.css";
import {checkUserIsExist, getCaptcha, registerUser} from "../api/user";
import {useDispatch} from "react-redux";
import {changeLoginStatus, initUserInfo} from "../redux/userSlice";

function LoginForm(props) {
    const handleOK = () => {
        props.closeModal();
    }

    const handleCancel = () => {
        // 重置表单
        setLoginInfo({
            loginId: "",
            loginPwd: "",
            captcha: "",
            remember: false
        });
        setRegisterInfo({
            loginId: "",
            nickname: "",
            captcha: "",
        });
        props.closeModal();
    }

    useEffect(() => {
        captchaClickHandle();
    }, [props.isShow]);

    const [value, setValue] = React.useState('login');
    // 登录表单的状态数据
    const loginFormRef = React.useRef();
    const [captcha, setCaptcha] = React.useState(null);
    const [loginInfo, setLoginInfo] = React.useState({
        loginId: "",
        loginPwd: "",
        captcha: "",
        remember: false
    });
    // 注册表单的状态数据
    const registerFormRef = React.useRef();
    const [registerInfo, setRegisterInfo] = React.useState({
        loginId: "",
        nickname: "",
        captcha: "",
    });

    const dispatch = useDispatch();

    const captchaClickHandle = () => {
        // 刷新验证码
        getCaptcha().then(res => {
            setCaptcha(res);
        });
    }

    const loginHandle = () => {
        console.log('loginHandle');
    }

    const registerHandle = () => {
        if (!registerInfo.loginId) {
            return;
        }
        registerUser(registerInfo).then(res => {
            if (res.data) {
                message.success("用户注册成功，默认密码为123456");
                dispatch(initUserInfo(res.data));
                dispatch(changeLoginStatus(true));
                handleCancel();
            } else {
                message.warning(res.msg);
                captchaClickHandle();
            }
        });
    }

    const checkLoginIdIsExist = async () => {
        if (!registerInfo.loginId) {
            return;
        }
        const {data} = await checkUserIsExist(registerInfo.loginId);
        if (data) {
            return Promise.reject('用户已存在');
        }
    }

    /**
     * 修改状态数据（通用函数）
     * @param oldInfo 之前整体的状态
     * @param newContent 用户输入的新的内容
     * @param key 对应的键名
     * @param setInfo 修改状态值的函数
     */
    const updateInfo = (oldInfo, newContent, key, setInfo) => {
        const obj = {...oldInfo};
        obj[key] = newContent;
        setInfo(obj);
    }

    let loginForm = null;

    if (value === 'login') {
        loginForm = (
            <div className={styles.container}>
                <Form
                    name="basic1"
                    autoComplete="off"
                    onFinish={loginHandle}
                    ref={loginFormRef}
                >
                    <Form.Item
                        label="登录账号"
                        name="loginId"
                        rules={[
                            {
                                required: true,
                                message: "请输入账号",
                            },
                        ]}
                    >
                        <Input
                            placeholder="请输入你的登录账号"
                            value={loginInfo.loginId}
                            onChange={(e) => updateInfo(loginInfo, e.target.value, 'loginId', setLoginInfo)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="登录密码"
                        name="loginPwd"
                        rules={[
                            {
                                required: true,
                                message: "请输入密码",
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder="请输入你的登录密码，新用户默认为123456"
                            value={loginInfo.loginPwd}
                            onChange={(e) => updateInfo(loginInfo, e.target.value, 'loginPwd', setLoginInfo)}
                        />
                    </Form.Item>

                    {/* 验证码 */}
                    <Form.Item
                        name="logincaptcha"
                        label="验证码"
                        rules={[
                            {
                                required: true,
                                message: '请输入验证码',
                            },
                        ]}
                    >
                        <Row align="middle">
                            <Col span={16}>
                                <Input
                                    placeholder="请输入验证码"
                                    value={loginInfo.captcha}
                                    onChange={(e) => updateInfo(loginInfo, e.target.value, 'captcha', setLoginInfo)}
                                />
                            </Col>
                            <Col span={6}>
                                <div
                                    className={styles.captchaImg}
                                    onClick={captchaClickHandle}
                                    dangerouslySetInnerHTML={{__html: captcha}}
                                ></div>
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        wrapperCol={{
                            offset: 5,
                            span: 16,
                        }}
                    >
                        <Checkbox
                            onChange={(e) => updateInfo(loginInfo, e.target.checked, 'remember', setLoginInfo)}
                            checked={loginInfo.remember}
                        >记住我</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 5,
                            span: 16,
                        }}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{marginRight: 20}}
                        >
                            登录
                        </Button>
                        <Button type="primary" onClick={(e) => {
                            e.preventDefault();
                            setLoginInfo({
                                loginId: "",
                                loginPwd: "",
                                captcha: "",
                                remember: false
                            });
                        }}>
                            重置
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    } else {
        loginForm = (
            <div className={styles.container}>
                <Form
                    name="basic2"
                    autoComplete="off"
                    ref={registerFormRef}
                    onFinish={registerHandle}
                >
                    <Form.Item
                        label="登录账号"
                        name="loginId"
                        rules={[
                            {
                                required: true,
                                message: "请输入账号，仅此项为必填项",
                            },
                            // 验证用户是否已经存在
                            {validator: checkLoginIdIsExist},
                        ]}
                        validateTrigger='onBlur'
                    >
                        <Input
                            placeholder="请输入账号"
                            value={registerInfo.loginId}
                            onChange={(e) => updateInfo(registerInfo, e.target.value, 'loginId', setRegisterInfo)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="用户昵称"
                        name="nickname"
                    >
                        <Input
                            placeholder="请输入昵称，不填写默认为新用户xxx"
                            value={registerInfo.nickname}
                            onChange={(e) => updateInfo(registerInfo, e.target.value, 'nickname', setRegisterInfo)}
                        />
                    </Form.Item>

                    <Form.Item
                        name="registercaptcha"
                        label="验证码"
                        rules={[
                            {
                                required: true,
                                message: '请输入验证码',
                            },
                        ]}
                    >
                        <Row align="middle">
                            <Col span={16}>
                                <Input
                                    placeholder="请输入验证码"
                                    value={registerInfo.captcha}
                                    onChange={(e) => updateInfo(registerInfo, e.target.value, 'captcha', setRegisterInfo)}
                                />
                            </Col>
                            <Col span={6}>
                                <div
                                    className={styles.captchaImg}
                                    onClick={captchaClickHandle}
                                    dangerouslySetInnerHTML={{__html: captcha}}
                                ></div>
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 5,
                            span: 16,
                        }}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{marginRight: 20}}
                        >
                            注册
                        </Button>
                        <Button type="primary" onClick={(e) => {
                            e.preventDefault();
                            setRegisterInfo({
                                loginId: "",
                                nickname: "",
                                captcha: "",
                            });
                        }}>
                            重置
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }

    return (
        <>
            <Modal title="登录 / 注册" open={props.isShow} onOk={handleOK} onCancel={props.closeModal}>
                <Radio.Group defaultValue="login"
                             buttonStyle="solid"
                             className={styles.radioGroup}
                             onChange={e => {
                                 setValue(e.target.value);
                                 // 切换登录和注册时，刷新验证码
                                 captchaClickHandle();
                             }}
                             value={value}>
                    <Radio.Button className={styles.radioButton} value="login">登录</Radio.Button>
                    <Radio.Button className={styles.radioButton} value="register">注册</Radio.Button>
                </Radio.Group>
                {/*下面要显示登录或注册表单*/}
                {loginForm}
            </Modal>
        </>
    );
}

export default LoginForm;
