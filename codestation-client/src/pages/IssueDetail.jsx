import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {getIssueById} from "../api/issue";
import styles from "../css/IssueDetail.module.css";
import PageHeader from "../components/PageHeader";
import ScoreRank from "../components/ScoreRank";
import Recommend from "../components/Recommend";
import {formatDate} from "../utils/tools";
import {getUserById} from "../api/user";
import {Avatar} from "antd";

function IssueDetail(props) {
    const [issueInfo, setIssueInfo] = useState(null);
    const [issueUser, setIssueUser] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        async function fetchData() {
            const {data} = await getIssueById(id);
            setIssueInfo(data);
            getUserById(data.userId).then(res => {
                setIssueUser(res.data);
            });
        }

        fetchData();
    }, [id]);
    return (
        <div className="container">
            <PageHeader title="问题详情"/>
            <div className={styles.detailContainer}>
                {/*左侧*/}
                <div className={styles.leftSide}>
                    <div className={styles.question}>
                        <h1>{issueInfo?.issueTitle}</h1>
                        <div className={styles.questioner}>
                            <Avatar size="small" src={issueUser?.avatar}/>
                            <span className={styles.user}>{issueUser?.nickname}</span>
                            <span style={{
                                marginLeft: 10,
                                color: "#999",
                                fontSize: 14
                            }}>发布于： {formatDate(issueInfo?.issueDate)}</span>
                        </div>
                        <div className={styles.content}>
                            <div dangerouslySetInnerHTML={{__html: issueInfo?.issueContent}}></div>
                        </div>
                    </div>
                </div>
                {/*右侧*/}
                <div className={styles.rightSide}>
                    <div style={{marginBottom: 20}}>
                        <Recommend/>
                    </div>
                    <div style={{marginBottom: 20}}>
                        <ScoreRank/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IssueDetail;
