import React, {useEffect, useRef, useState} from 'react';
import styles from '../css/Discuss.module.css';
import {useSelector} from 'react-redux';
import {UserOutlined} from '@ant-design/icons';
import "@toast-ui/editor/dist/i18n/zh-cn";
import {Avatar, Button, List} from 'antd';
import {Editor} from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import {getIssueCommentById} from "../api/comment";
import {getUserById} from "../api/user";
import {formatDate} from "../utils/tools";


function Discuss(props) {
    const {userInfo, isLogin} = useSelector(state => state.user);
    const [commentList, setCommentList] = useState([]);
    const [pageInfo, setPageInfo] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    });

    useEffect(() => {
        async function fetchCommentList() {
            let data = null;
            if (props.commentType === 1) {
                // 传递过来的是问答的 id，所以需要获取该问答 id 所对应的评论
                const result = await getIssueCommentById(props.targetId, {
                    current: pageInfo.current,
                    pageSize: pageInfo.pageSize
                });
                data = result.data;
            } else if (props.commentType === 2) {
                // 传递过来的是书籍的 id，所以需要获取该书籍 id 所对应的评论
            }
            for (let i = 0; i < data.data.length; i++) {
                const result = await getUserById(data.data[i].userId);
                // 将用户的信息添加到评论对象上面
                data.data[i].userInfo = result.data;
            }
            // 更新评论数据
            setCommentList(data.data);
            // 更新分页数据
            setPageInfo({
                currentPage: data.currentPage,
                eachPage: data.eachPage,
                count: data.count,
                totalPage: data.totalPage
            })
        }

        if (props.targetId) {
            fetchCommentList();
        }
    }, [props.targetId]);

    const editorRef = useRef();
    let avatar = null;
    if (isLogin) {
        avatar = (<Avatar size="large" src={userInfo.avatar}/>);
    } else {
        avatar = (<Avatar icon={<UserOutlined/>}/>);
    }

    return (
        <div className="container">
            {/*评论区*/}
            <div className={styles.commentHeader}>
                <h2>评论</h2>
            </div>
            {/*评论框*/}
            <div className={styles.comment}>
                <div className={styles.avatar}>
                    {avatar}
                </div>
                <div className={styles.commentEditor}>
                    <Editor
                        previewStyle="vertical"
                        initialValue=" "
                        height="300px"
                        initialEditType="wysiwyg"
                        useCommandShortcut={true}
                        language='zh-CN'
                        ref={editorRef}
                    />
                    <div className={styles.commentFooter}>
                        <Button className={styles.commentBtn} type="primary">发表评论</Button>
                    </div>
                </div>
            </div>
            {/*评论列表*/}
            {
                commentList?.length > 0 &&
                <List
                    header={`共 ${pageInfo.count} 条评论`}
                    dataSource={commentList}
                    itemLayout="horizontal"
                    renderItem={item => (
                        <List.Item>
                            <div className={styles.commentItem}>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.userInfo.avatar}/>}
                                    title={item.userInfo.nickname}
                                    description={formatDate(item.commentDate)}
                                />
                                <div dangerouslySetInnerHTML={{__html: item.commentContent}}></div>
                            </div>
                        </List.Item>
                    )}
                />
            }
        </div>
    );
}

export default Discuss;
