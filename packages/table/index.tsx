/*
 * @Author: xieyejian
 * @Date: 2022-06-29 13:21:12
 * @Description: 表格组件
 */

import React from "react";

interface TableProps {
    text: string;
}

const Table: React.FC<TableProps> = ({ text }) => {
    return <div className="xyj-table">表格-{text}</div>;
};

export default Table;
