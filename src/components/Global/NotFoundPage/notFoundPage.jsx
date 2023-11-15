import React from "react";
// import caveman from '../../../Assets/Images/Caveman.gif';
import { Link } from "react-router-dom";
import "./notFoundPage.css";

const notFoundPage = () => {
  return (
    <div className="page_404" style={{ marginTop: "5.9rem", paddingLeft: "10px" }}>
      <h1> Benvenuto nel portale Polieco</h1>
      <div>
        <Link to="//"> Home Page</Link>
      </div>
    </div>
  );
};

export default notFoundPage;
