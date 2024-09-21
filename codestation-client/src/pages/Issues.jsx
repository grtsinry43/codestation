import React from 'react';
import styles from "../css/Issue.module.css";
import PageHeader from "../components/PageHeader";

function Issues(props) {
    return (
        <div className={styles.container}>
            {/*头部区域*/}
            <PageHeader title="问答列表"/>
            {/*内容区域*/}
            <div className={styles.issueContainer}>
                {/*左面区域*/}
                <div className={styles.leftSide}>

                </div>
                {/*右面区域*/}
            </div>
        </div>
    );
}

export default Issues;
