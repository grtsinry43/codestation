import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import PageHeader from "../components/PageHeader";
import ScoreRank from "../components/ScoreRank";
import Recommend from "../components/Recommend";
import styles from "../css/SearchPage.module.css";
import {getIssueByPage} from "../api/issue";
import SearchResultItem from "../components/SearchResultItem";
import AddIssueButton from "../components/AddIssueButton";

function SearchPage(props) {
    const location = useLocation();
    // 存储搜索结果
    const [searchResult, setSearchResult] = useState([]);
    const [pageInfo, setPageInfo] = useState({
        current: 1,
        pageSize: 15,
        total: 0
    });

    useEffect(() => {
        async function fetchData(state){
            const {value, searchOption} = state;
            let searchParams = {
                current: pageInfo.current,
                pageSize: pageInfo.pageSize,
                issueStatus: true,
            }
            switch(searchOption){
                case "issue":{
                    searchParams.issueTitle = value;
                    const {data} = await getIssueByPage(searchParams);
                    // 更新搜索结果
                    setSearchResult(data.data);
                    // 更新分页信息
                    setPageInfo({
                        current: data.currentPage,
                        pageSize: data.eachPage,
                        total: data.count,
                    });
                    break;
                }
                case "book":{
                    // 搜索书籍
                    break;
                }
            }
        }
        if(location.state){
            fetchData(location.state);
        }
    },[location.state]);


    return (
        <div className="container">
            <PageHeader title="搜索结果"/>
            <div className={styles.searchPageContainer}>
                {/* 左边部分 */}
                <div className={styles.leftSide}>
                    {
                        searchResult.length > 0 ? searchResult.map(item=>{
                            return <SearchResultItem info={item} key={item._id}/>
                        }) : <div>暂无搜索结果</div>
                    }
                </div>
                {/* 右边部分 */}
                <div className={styles.rightSide}>
                    <AddIssueButton />
                    <div style={{ marginBottom: 20 }}>
                        <Recommend />
                    </div>
                    <div style={{ marginBottom: 20 }}>
                        <ScoreRank />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
