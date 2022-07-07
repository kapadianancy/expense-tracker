import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Colors } from "../../Constants";

import * as reportAction from "../../Actions/reports";

am4core.useTheme(am4themes_animated);

const TransByAcc = () => {
  const chart = useRef(null);
  const [data, setData] = useState([]);
  var result = [];

  useEffect(() => {
    const asyncCall = async () => {
      result = await reportAction.getTransByAcc();

      setData(result);
    };
    asyncCall();
  }, []);

  useLayoutEffect(() => {
    let chart = am4core.create("chartdiv", am4charts.PieChart);

    // Create pie series
    let series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "total";
    series.dataFields.category = "account";

    // Add data
    chart.data = data;

    // And, for a good measure, let's add a legend
    chart.legend = new am4charts.Legend();

    return () => {
      chart.dispose();
    };
  }, [data]);

  return (
    <div style={{ width: "100%" }}>
      <div style={styles.pageTitle}>Transaction By Account/Wallets</div>

      <div
        id="chartdiv"
        style={{ width: "100%", height: "400px", marginBottom: "20px" }}
      ></div>
    </div>
  );
};

const styles = {
  pageTitle: {
    fontSize: "x-large",
    fontStyle: "oblique",
    fontWeight: "bold",
    color: Colors.darkBlue,
    marginBottom: "10px",
  },
};

export default TransByAcc;
