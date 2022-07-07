import axiosInstance from "../axios";

export const getTransByAcc = async () => {
  try {
    const userId = localStorage.getItem("user");
    //get all accounts of user
    const result = await axiosInstance.get("/acc/" + userId);
    const accounts = result.data.accounts;

    let data = [];
    accounts.map(async (a) => {
      const trans = await axiosInstance.get(
        "/transaction/" + userId + "?account=" + a._id
      );
      const total = trans.data.total;
      let obj = {
        account: a.name,
        total: total,
      };
      data.push(obj);
      return data;
    });

    return data;
  } catch (e) {
    console.log(e);
  }
};
