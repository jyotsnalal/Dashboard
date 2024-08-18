// Dashboard.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataRequest } from "../Redux/Action/Index";
import TableView from "./TableView";
import PieChartView from "./PieChartView";
import { Dropdown, Menu, Button, Spin } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./Dashboard.css";

const FilterDropdown = ({ options, filter, setFilter, filterKey, placeholder }) => {
  const handleMenuClick = (e) => {
    setFilter({ ...filter, [filterKey]: e.key });
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="">All {placeholder}</Menu.Item>
      {options.map((option, idx) => (
        <Menu.Item key={option}>
          {option}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        {filter[filterKey] || `Select ${placeholder}`} <DownOutlined />
      </Button>
    </Dropdown>
  );
};


const Dashboard = () => {
  const [view, setView] = useState("table");
  const [filter, setFilter] = useState({ user: "", category: "" });
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchDataRequest());
  }, [dispatch]);

  const userOptions = Array.from(new Set(data.map((item) => item.user)));
  const categoryOptions = Array.from(new Set(data.map((item) => item.category)));
  
  
  const filteredData = data.filter((item) => {
    return (
      (filter.user === "" || item.user === filter.user) &&
      (filter.category === "" || item.category === filter.category)
    );
  });
  
  if (loading) return <Spin size="large"/>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container">
      <h1 className="heading">Dashboard</h1>

      <div className="filters">
        <div className="filter-selects">

        <FilterDropdown
            options={userOptions}
            filter={filter}
            setFilter={setFilter}
            filterKey="user"
            placeholder="User"
          />
          <FilterDropdown
            options={categoryOptions}
            filter={filter}
            setFilter={setFilter}
            filterKey="category"
            placeholder="Category"
          />
        </div>

        <div className="button-group">
          <Button
            type="primary"
            className={`button table-view ${view === "table" ? "active" : ""}`}
            onClick={() => setView("table")}
          >
            Table
          </Button>
          <Button
            type="primary"
            className={`button pie-chart-view ${
              view === "chart" ? "active" : ""
            }`}
            onClick={() => setView("chart")}
          >
            Pie Chart
          </Button>
        </div>
      </div>

      <div className="content">
        {view === "table" ? (
          <TableView data={filteredData} />
        ) : (
          <PieChartView data={filteredData} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
