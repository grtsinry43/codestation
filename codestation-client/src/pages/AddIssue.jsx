import React, {useEffect, useRef, useState} from 'react';
import styles from "../css/AddIssue.module.css";
import {Editor} from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/zh-cn";
import {Button, Form, Input, Select, message} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {getTypeListAsync} from "../redux/typeListSlice";
import {typeOptionCreator} from "../utils/tools";
import {addIssue} from "../api/issue";
import {useNavigate} from "react-router";

function AddIssue(props) {
    const formRef = useRef();
    const editorRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userInfo = useSelector(state => state.user.userInfo);

    const addHandle = () => {
        const content = editorRef.current.getInstance().getHTML();
        addIssue({
            issueTitle: issueInfo.issueTitle,
            issueContent: content,
            userId: userInfo._id,
            typeId: issueInfo.typeId,
        }).then(async (res) => {
            console.log(res);
            if (res.data) {
                message.success("你的问题已经提交，审核通过后将会进行展示");
                formRef.current.resetFields();
                setIssueInfo({
                    issueTitle: "",
                    issueContent: "",
                    userId: "",
                    typeId: "",
                });

                editorRef.current.getInstance().setHTML('');
                // 跳转到首页
                navigate("/");
            } else {
                message.error(res.msg);
            }
        }).catch(() => {
            message.error("提交失败，请重试");
        });
    }

    const [issueInfo, setIssueInfo] = useState({
        issueTitle: "",
        issueContent: "",
        userId: "",
        typeId: "",
    });

    const typeList = useSelector(state => state.typeList.typeList);

    useEffect(() => {
        if (!typeList.length) {
            dispatch(getTypeListAsync());
        }
    }, [typeList, dispatch]);

    const handleChange = (value) => {
        setIssueInfo({
            ...issueInfo,
            typeId: value
        })
    }

    const updateInfo = (newContent, key) => {
        setIssueInfo({
            ...issueInfo,
            [key]: newContent
        })
    }

    const resetForm = () => {
        formRef.current.resetFields();
        setIssueInfo({
            issueTitle: "",
            issueContent: "",
            userId: "",
            typeId: "",
        });
        editorRef.current.getInstance().setHTML('');
    }

    return (
        <div className={styles.container}>
            <Form
                name="basic"
                initialValues={issueInfo}
                autoComplete="off"
                ref={formRef}
                onFinish={addHandle}
            >
                <Form.Item
                    label="标题"
                    name="issueTitle"
                    rules={[{required: true, message: '请输入标题'}]}
                >
                    <Input
                        placeholder="请输入标题"
                        size="large"
                        value={issueInfo.issueTitle}
                        onChange={(e) => updateInfo(e.target.value, 'issueTitle')}
                    />
                </Form.Item>

                <Form.Item
                    label="问题分类"
                    name="typeId"
                    rules={[{required: true, message: '请选择问题所属分类'}]}
                >
                    <Select
                        style={{width: 200}}
                        onChange={handleChange}>
                        {typeOptionCreator(Select, typeList)}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="问题描述"
                    name="issueContent"
                    rules={[{required: true, message: '请输入问题描述'}]}
                >
                    <Editor
                        previewStyle="vertical"
                        initialValue=" "
                        height="600px"
                        initialEditType="wysiwyg"
                        useCommandShortcut={true}
                        language='zh-CN'
                        ref={editorRef}
                    />
                </Form.Item>

                <Form.Item wrapperCol={{offset: 3, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        确认新增
                    </Button>

                    <Button type="link" onClick={resetForm} className="resetBtn">
                        重置
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AddIssue;
