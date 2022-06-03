import { Colors } from "../../Constants";

export const styles = {
  header: {
    backgroundColor: Colors.darkBlue,
    display: "flex",
    flexDirection: "row",
  },
  logo: {
    height: 80,
    width: 80,
    margin: "0px 10px",
  },
  title: {
    color: Colors.yellow,
    fontWeight: "bold",
    fontStyle: "oblique",
    marginLeft: "20px",
    flex: 1,
    alignSelf: "center",
  },
  user: {
    alignSelf: "center",
    margin: "2px 20px",
    color: Colors.smoke,
  },
};
