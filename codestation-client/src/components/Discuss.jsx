import React, {useEffect, useRef, useState} from 'react';
import styles from '../css/Discuss.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {UserOutlined} from '@ant-design/icons';
import "@toast-ui/editor/dist/i18n/zh-cn";
import {Avatar, Button, List, message, Pagination} from 'antd';
import {Editor} from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import {addComment, getIssueCommentById} from "../api/comment";
import {getUserById} from "../api/user";
import {formatDate} from "../utils/tools";
import {updateIssue} from "../api/issue";
import {updateUserInfoAsync} from "../redux/userSlice";

function Discuss(props) {
    const {userInfo, isLogin} = useSelector(state => state.user);
    const [commentList, setCommentList] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [pageInfo, setPageInfo] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    });
    const dispatch = useDispatch();

    const editorRef = useRef();

    const handleSubmit = () => {
        let newComment = editorRef.current.getInstance().getHTML();
        if (newComment === "<p><br></p>") {
            newComment = "";
        }

        if (!newComment) {
            message.warning("请输入评论内容");
            return;
        }

        addComment({
            commentContent: newComment,
            commentType: props.commentType,
            targetId: props.targetId,
            userId: userInfo._id,
            issueId: props.targetId,
            typeId: props.issueInfo ? props.issueInfo.typeId : props.bookInfo.bookId
        }).then(res => {
            if (res.code === 0) {
                message.success("评论成功，积分+4");
                editorRef.current.getInstance().setHTML('');
                setRefresh(!refresh);
                setPageInfo(prev => ({
                    ...prev,
                    total: prev.total + 1
                }));
                updateIssue(props.targetId, {
                    commentNumber: pageInfo.total + 1
                });
                // 更新积分的变化
                dispatch(updateUserInfoAsync({
                    userId: userInfo._id,
                    newInfo: {
                        points: userInfo.points + 4
                    }
                }));
            } else {
                message.error("评论失败");
            }
        });
    };

    useEffect(() => {
        const fetchComments = async () => {
            let data = null;
            if (props.commentType === 1) {
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
                data.data[i].userInfo = result.data;
            }

            setCommentList(data.data);
            setPageInfo({
                current: data.currentPage,
                pageSize: data.eachPage,
                total: data.count
            });
        };

        if (props.targetId) {
            fetchComments();
        }
    }, [props.targetId, refresh, pageInfo.current, pageInfo.pageSize]);

    const avatar = isLogin && userInfo ? (
        <Avatar size="large" src={userInfo.avatar}/>
    ) : (
        <Avatar icon={<UserOutlined/>}/>
    );

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
                        <Button
                            onClick={handleSubmit}
                            className={styles.commentBtn} type="primary">发表评论</Button>
                    </div>
                </div>
            </div>
            {/*评论列表*/}
            {commentList.length > 0 && (
                <List
                    header={`共 ${pageInfo.total} 条评论`}
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
            )}
            {/*分页组件*/}
            {commentList.length > 0 && (
                <div className={styles.paginationContainer}>
                    <Pagination
                        current={pageInfo.current}
                        pageSize={pageInfo.pageSize}
                        total={pageInfo.total}
                        showSizeChanger
                        showQuickJumper
                        onChange={(page, pageSize) => {
                            setPageInfo({
                                ...pageInfo,
                                current: page,
                                pageSize: pageSize
                            });
                        }}
                        onShowSizeChange={(current, size) => {
                            setPageInfo({
                                ...pageInfo,
                                current: current,
                                pageSize: size
                            });
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default Discuss;
