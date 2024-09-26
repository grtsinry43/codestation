import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeBookTypeId, changeIssueTypeId, getTypeList} from "../redux/typeListSlice";
import {Tag} from "antd";
import {useLocation} from "react-router-dom";

function TypeSelect(props) {
    const {typeList} = useSelector(state => state.typeList);
    const dispatch = useDispatch();
    const location = useLocation();
    const colorArr = ["#108ee9", "#2db7f5", "#f50", "green", "#87d068", "blue", "red", "purple"];
    const [ListContent, setListContent] = useState([]);
    const changeTypeHandle = (id) => {
        if (location.pathname === "/issues") {
            dispatch(changeIssueTypeId(id));

        } else if (location.pathname === "/books") {

        }
    }
    useEffect(() => {
        if (!typeList.length) {
            dispatch(getTypeList());
        } else {
            let arr = [
                <Tag key="all"
                     onClick={() => changeTypeHandle("all")}
                     style={{cursor: "pointer"}}
                     color="default">全部</Tag>
            ];
            arr = arr.concat(typeList.map((item, index) => (
                <Tag key={item._id}
                     style={{cursor: "pointer"}}
                     onClick={() => changeTypeHandle(item._id)}
                     color={colorArr[index % colorArr.length]}>{item.typeName}</Tag>
            )));
            setListContent(arr);
        }
    }, [typeList, dispatch]);
    return (
        <div>
            {ListContent}
        </div>
    );
}

export default TypeSelect;
