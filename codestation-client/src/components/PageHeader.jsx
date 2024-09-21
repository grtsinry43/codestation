import React from 'react';
import styles from "../css/PageHeader.module.css";

/**
 * 每页的页头
 * @param props
 * @returns {Element}
 * @constructor
 */
function PageHeader(props) {
    return (
        <div className={styles.row}>
            <div className={styles.pageHeader}>
                {props.title}
            </div>
            {/*分类选择组件*/}
        </div>
    );
}

export default PageHeader;
