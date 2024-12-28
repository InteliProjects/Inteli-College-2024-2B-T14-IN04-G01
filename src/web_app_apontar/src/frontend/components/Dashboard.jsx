import React from "react";
import {LineGraph} from "./LineGraph.jsx";
import {BarChart} from "./BarChart.jsx";
import {PieGraph} from "./PieGraph.jsx";

const Dashboard = () => {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1>Dashboard</h1>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
          <div style={{ width: "400px", height: "400px" }}>
            <LineGraph />
          </div>
          <div style={{ width: "400px", height: "400px" }}>
            <BarChart />
          </div>
          <div style={{ width: "400px", height: "400px" }}>
            <PieGraph />
          </div>
        </div>
      </div>
    );
  };
  
  export default Dashboard;