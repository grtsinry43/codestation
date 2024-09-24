import React, {useEffect} from 'react';
import styles from "../css/Issue.module.css";
import PageHeader from "../components/PageHeader";
import IssueItem from "../components/IssueItem";
import {getIssueByPage} from "../api/issue";
import {Pagination} from "antd";
import AddIssueButton from "../components/AddIssueButton";
import Recommend from "../components/Recommend";
import ScoreRank from "../components/ScoreRank";

function Issues(props) {
    const [issueInfo, setIssueInfo] = React.useState([]);
    const [pageInfo, setPageInfo] = React.useState({
        current: 1,
        pageSize: 15,
        total: 0
    });

    useEffect(() => {
        async function fetchData() {
            const {data} = await getIssueByPage({
                current: pageInfo.current,
                pageSize: pageInfo.pageSize,
                issueStatus: true
            });
            setIssueInfo(data.data);
            setPageInfo({
                current: data.currentPage,
                pageSize: data.eachPage,
                total: data.count
            });
        }

        fetchData();
    }, [pageInfo.current, pageInfo.pageSize]);

    let issueList = [];
    for (let i = 0; i < issueInfo.length; i++) {
        issueList.push(<IssueItem key={i} issueInfo={issueInfo[i]}/>);
    }

    /**
     * 处理翻页
     */
    function handlePageChange(current, pageSize) {
        setPageInfo({
            current,
            pageSize,
        })
    }

    return (
        <div className="container">
            {/*头部区域*/}
            <PageHeader title="问答列表"/>
            {/*内容区域*/}
            <div className={styles.issueContainer}>
                {/*左面区域*/}
                <div className={styles.leftSide}>
                    {issueList}
                    {/*翻页组件*/}
                    <div className="paginationContainer">
                        <Pagination
                            showQuickJumper
                            defaultCurrrent={1}
                            {...pageInfo}
                            showSizeChanger
                            pageSizeOptions={['5', '10', '20']}
                            onChange={handlePageChange}
                        />
                    </div>
                </div>
                {/*右面区域*/}
                <div className={styles.rightSide}>
                    <AddIssueButton showLoginModal={props.showLoginModal}/>
                    <Recommend/>
                    <ScoreRank/>
                </div>
            </div>
        </div>
    );
}

export default Issues;
