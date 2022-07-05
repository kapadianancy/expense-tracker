import { Colors } from "../../Constants";

export const styles = {
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
  tbl: {
    display: "flex",
    flex: 1,
    margin: "30px 30px",
    paddingBottom: "30px",
  },
  tblHeader: {
    color: Colors.lightBlue,
  },
  trExpense: {
    backgroundColor: "rgba(255, 0, 0, 0.1)",
  },
  trIncome: {
    backgroundColor: "rgba(0,255,0,0.1)",
  },
  formTitle: {
    color: Colors.lightBlue,
  },
  yelloBtn: {
    backgroundColor: Colors.yellow,
    borderColor: Colors.yellow,
    color: Colors.darkBlue,
    fontWeight: "bold",
  },
  filterSelect: {
    display: "flex",
    justifyContent: "flex-end",
    marginRight: "10px",
  },
  filters: {
    marginRight: "5px",
  },
};
