import React from "react";
import { Link } from 'react-router-dom';
const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light"> 
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/assignment">Assignment</Link>

    </nav>
  );
};

export default Navigation;
