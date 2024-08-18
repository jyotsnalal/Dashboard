import React from "react";
import ReactFC from "./Charts/FusionChartsConfig";

const PieChartView = ({ data }) => {
  const categories = [...new Set(data.map((item) => item.category))];
  const categoryCounts = categories.map(
    (category) => data.filter((item) => item.category === category).length
  );

  const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

  const chartData = {
    chart: {
      caption: "Category Distribution",
      theme: "fusion",
      use3DLighting: "1",
      showLegend: "1",
      legendPosition: "RIGHT",
      legendIconScale: "1.2",
      legendItemFontSize: "14",
      pieRadius: '60%',
    },
    data: categories.map((category, index) => ({
      label: category,
      value: categoryCounts[index],
      color: colors[index % colors.length],
    }))
  };



  return (
    <div className="p-2 bg-white shadow-md rounded-lg" style={{ marginTop: 0 }}>
      <ReactFC
        type="pie3d"
        width="100%"
        height="400"
        dataFormat="json"
        dataSource={chartData}
      />
    </div>
  );
};

export default PieChartView;