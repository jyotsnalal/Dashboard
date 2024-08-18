import React from "react";
import { Table, Tag } from "antd";
import 'antd/dist/reset.css';
import './TableView.css';

const TableView = ({ data }) => {
  const dataSource = data.map((vals) => ({
    key: vals.id,
    user: vals.user,
    category: vals.category,
    activity: vals.details
  }));

  const columns = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: text => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Activity",
      dataIndex: "activity",
      key: "activity",
    }
  ];

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <Table 
      dataSource={dataSource} 
      columns={columns}
      rowKey="id"
      pagination={{ pageSize: 8 }}
      bordered
      size="middle"
      className="custom-table"
      />
      
    </div>
  );
};

export default TableView;
