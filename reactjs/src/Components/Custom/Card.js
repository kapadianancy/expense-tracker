import React from "react";
import { Colors } from "../../Constants";

const Card = (props) => {
  const styles = {
    card: {
      padding: "15px",
      backgroundColor: Colors.white,
      borderRadius: 10,
      display: "inline-block",
      marginLeft: "50px",
    },
  };
  return <div style={{ ...styles.card, ...props.style }}>{props.children}</div>;
};

export default Card;
