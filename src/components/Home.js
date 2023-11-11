import React from "react";
import "../css/Home.css";
import Navbar2 from "./Navbar2";
import { Link } from "react-router-dom";
// import { Navigate } from "react-router-dom";
export const Home = () => {

    // const navigate = Navigate();

  return (
    <div className="home">
      <Navbar2 />
      <div className="homeContent">
        <div className="heading1">Unleash your Imagination</div>
        <div className="heading2">Create-Share-Comic On</div>
      </div>
      <div className="buttons">
        <Link to="/input"><button>Generate Comic</button></Link>
        <Link to="/comics"><button>View Comic</button></Link>
      </div>

    </div>
  );
};
export default Home;
