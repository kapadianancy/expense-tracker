import { Colors } from "../../Constants";

export const styles = {
  list: {
    display: "flex",
    flex: 1,
    margin: "30px 30px",
    paddingBottom: "30px",
  },
  btn: {
    backgroundColor: Colors.yellow,
    borderColor: Colors.yellow,
    color: Colors.darkBlue,
    fontWeight: "bold",
  },
  pageTitle: {
    fontSize: "x-large",
    fontStyle: "oblique",
    fontWeight: "bold",
    color: Colors.darkBlue,
    flex: 1,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    margin: "10px 30px",
  },
  title: {
    display: "flex",
    flexDirection: "row",
    color: Colors.lightBlue,
    fontWeight: "bold",
  },
  formTitle: {
    color: Colors.lightBlue,
  },
};
