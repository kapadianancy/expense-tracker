import React from "react";
import { styles } from "./Header-css";
import { BsPersonCircle } from "react-icons/bs";

const Header = () => {
  const path = "../assets/images/logo-1.png";
  return (
    <header style={styles.header}>
      <img src={path} style={styles.logo} />
      <h2 style={styles.title}>Spendee</h2>
      <h3 style={styles.user}>
        <BsPersonCircle />
      </h3>
    </header>
  );
};

export default Header;
