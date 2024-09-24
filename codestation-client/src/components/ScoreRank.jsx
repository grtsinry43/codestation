import React, {useEffect} from 'react';
import {getUserByPointsRank} from "../api/user";
import ScoreItem from "./ScoreItem";
import {Card} from "antd";

function ScoreRank(props) {
    const [userRankList, setUserRankList] = React.useState([]);
    useEffect(() => {
        getUserByPointsRank().then(res => {
            setUserRankList(res.data);
            console.log(res.data);
        });
    }, []);

    const userRankListItems = userRankList.map((item, index) => {
        return <ScoreItem key={item._id} userNum={index + 1} userInfo={item}/>
    });

    return (
        <div>
            <Card title="积分排行榜" style={{width: 300}}>
                {userRankListItems}
            </Card>
        </div>
    );
}

export default ScoreRank;
