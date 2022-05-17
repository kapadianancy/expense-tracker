import { Colors } from "../../Constants";

const path = "../assets/images/bg-1.jpg";
export const styles = {
  bg: {
    backgroundImage: "url(" + path + ")",
    height: "100%",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    alignItems: "center",
    display: "flex",
    justifyContent: "flex-start",
  },
  card: {
    width: "35%",
  },
  h1: {
    color: Colors.darkBlue,
    fontWeight: "bold",
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: "15px",
  },
  label: {
    color: Colors.lightBlue,
    fontWeight: "bold",
  },
  btn: {
    backgroundColor: Colors.yellow,
    borderColor: Colors.yellow,
    color: Colors.darkBlue,
    fontWeight: "bold",
    margin: "10px auto",
  },
};
