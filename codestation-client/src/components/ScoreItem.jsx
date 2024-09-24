import React from 'react';
import styles from "../css/ScoreItem.module.css";
import {Avatar} from "antd";
import classname from 'classnames';

function ScoreItem(props) {
    const renderRankIcon = (rank) => {
        switch (rank) {
            case 1:
                return <span className={classname('iconfont', 'icon-jiangbei')} style={{color: 'gold'}}/>;
            case 2:
                return <span className={classname('iconfont', 'icon-jiangbei')} style={{color: 'silver'}}/>;
            case 3:
                return <span className={classname('iconfont', 'icon-jiangbei')} style={{color: '#cd7f32'}}/>;
            default:
                return <span className={styles.rank}>{rank}</span>;
        }
    };

    return (
        <div className={styles.container}>
            {/*名次，头像，昵称*/}
            <div className={styles.left}>
                {renderRankIcon(props.userNum)}
                <div className={styles.avatar}>
                    <Avatar size={20} src={props.userInfo.avatar}/>
                </div>
                <div className={styles.nickname}>
                    {props.userInfo.nickname}
                </div>
            </div>
            <div className={styles.right}>
                {/*积分*/}
                <div>{props.userInfo.points}</div>
            </div>
        </div>
    );
}

export default ScoreItem;
