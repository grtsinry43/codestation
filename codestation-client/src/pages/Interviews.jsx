import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getInterviewTitleAsync} from "../redux/interviewSlice";
import {getTypeListAsync} from "../redux/typeListSlice";
import {FloatButton, Tree} from "antd";
import {getInterviewById} from "../api/interview";
import styles from "../css/Interview.module.css";
import PageHeader from "../components/PageHeader";

function Interviews(props) {
    const dispatch = useDispatch();
    const {interviewTitleList} = useSelector(state => state.interview);
    const {typeList} = useSelector(state => state.typeList);
    const [interviewData, setInterviewData] = React.useState([]);
    const clickHandle = async (id) => {
        const {data} = await getInterviewById(id);
        setInterviewInfo(data);
    }
    const [interviewInfo, setInterviewInfo] = React.useState(null);

    useEffect(() => {
        // 拿到面试题目列表和分类列表
        if (!interviewTitleList.length) {
            dispatch(getInterviewTitleAsync());
        }
        if (!typeList.length) {
            dispatch(getTypeListAsync());
        }
        // 上面两个面试题准备好之后，就可以开始组装 tree 组件所需的 data 数组了
        if (typeList.length && interviewTitleList.length) {
            const arr = []; // 最终组装的数据会放入到该数组中
            // 添加分类标题
            for (let i = 0; i < typeList.length; i++) {
                arr.push({
                    title: (<h3 style={{fontWeight: '200'}}>
                        {typeList[i].typeName}
                    </h3>),
                    key: i
                })
            }
            // 每一个分类下面的面试题标题
            for (let i = 0; i < interviewTitleList.length; i++) {
                const childArr = [];
                for (let j = 0; j < interviewTitleList[i].length; j++) {
                    childArr.push({
                        title: (
                            <h4 style={{fontWeight: '200'}} onClick={() => clickHandle(interviewTitleList[i][j]._id)}>
                                {interviewTitleList[i][j].interviewTitle}
                            </h4>),
                        key: `${i}-${j}`
                    })
                }
                arr[i].children = childArr;
            }
            setInterviewData(arr);
        }
    }, [interviewTitleList, typeList]);

    let interviewRightSide = null;
    if (interviewInfo) {
        // 赋值为面试题的内容
        interviewRightSide = (
            <div className={styles.content}>
                <h1 className={styles.interviewRightTitle}>{interviewInfo?.interviewTitle}</h1>
                <div className={styles.contentContainer}>
                    <div dangerouslySetInnerHTML={{__html: interviewInfo?.interviewContent}}></div>
                </div>
            </div>
        );
    } else {
        interviewRightSide = (
            <div style={{
                textAlign: "center",
                fontSize: "40px",
                fontWeight: "100",
                marginTop: "150px"
            }}>
                请在左侧选择面试题
            </div>
        )
    }

    return (
        <div className="container">
            <PageHeader title="面试题大全"/>
            <div className={styles.interviewContainer}>
                <div className={styles.leftSide}>
                    <Tree
                        treeData={interviewData}
                    />
                </div>
                <div className={styles.rightSide}>
                    {interviewRightSide}
                </div>
            </div>
            <FloatButton.BackTop/>
        </div>
    );
}

export default Interviews;
