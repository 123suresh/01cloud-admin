import React from "react";
import { Card, CardContent, CardHeader, Divider } from "@material-ui/core";
// import { makeStyles } from "@material-ui/styles";
import LineChart from "../linechart/LineChart";

// const useStyles = makeStyles(() => ({}));

const ChartCard = (props) => {
  //const classes = useStyles();
  return (
    <Card>
      <CardHeader title={props.title} />
      <Divider />
      <CardContent>
        <LineChart
          data={props.data}
          lineColor={props.lineColor}
          xtitle={props.xtitle}
          ytitle={props.ytitle}
          suffix={props.suffix}
        />
      </CardContent>
    </Card>
  );
};

export default ChartCard;
