import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Home.css";

const Home = () => {
  return (
    <div className="landing-container">
      <motion.h1
        className="landing-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to <span>Fury World</span>
      </motion.h1>

      <motion.p
        className="landing-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        Manage complaints with power and efficiency.
      </motion.p>

      <div className="button-group">
        <Link to="/login">
          <motion.button
            className="landing-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Login
          </motion.button>
        </Link>
        <Link to="/signup">
          <motion.button
            className="landing-btn signup-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Sign Up
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
