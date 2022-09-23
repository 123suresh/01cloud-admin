import React from "react";
import { LineChart as LineC } from "react-chartkick";
//import { Line } from "react-chartjs-2";
import {
  Card,
  CardHeader,
  CardContent,
  Divider
} from "@material-ui/core";

const LineChart = () => {
  // const [filter, setFilter] = useState("Last 8 months");
  const revenue_data = {
    "2020-01-01": 1001,
    "2020-02-01": 2061,
    "2020-03-01": 8061,
    "2020-04-01": 4061,
    "2020-05-01": 7061,
    "2020-06-01": 1061,
    "2020-07-01": 1061,
    "2020-08-01": 3000,
    "2020-09-01": 2050,
    "2020-10-01": 3556,
    "2020-11-01": 6026,
    "2020-12-01": 4086,
  };
  // const handleChange = (e) => {
  //   setFilter(e.target.value);
  // };
  return (
    <div>
      {/* <Line data={data} /> */}
      <Card>
        <CardHeader
          title="Revenue Graph"
          // action={
          //   <FormControl variant="outlined">
          //     <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
          //     <Select
          //       labelId="demo-simple-select-outlined-label"
          //       id="demo-simple-select-outlined"
          //       value={filter}
          //       onChange={handleChange}
          //       label="Filter"
          //     >
          //       <MenuItem value={"Last 8 months"}>Last 8 months</MenuItem>
          //       <MenuItem value={"Last 30 days"}>Last 30 days</MenuItem>
          //     </Select>
          //   </FormControl>
          // }
        />

        <Divider />
        <CardContent>
          <div>
            <LineC
              xtitle="Dates"
              legend={true}
              ytitle="Revenue"
              data={revenue_data}
              prefix="$"
              thousands=","
              // precision={3}
              round={2}
              zeros={true}
              messages={{ empty: "No data" }}
              dataset={{ label: "Revenue Per Month", borderCapStyle: "butt" }}
              download={true}
            />
          </div>
          {/* <div className={classes.stats}>
            {subscription.map((device) => (
              <div className={classes.device} key={device.title}>
                <span className={classes.deviceIcon}>{device.icon}</span>
                <Typography variant="body1">{device.title}</Typography>
                <Typography style={{ color: device.color }} variant="h2">
                  {device.value}%
                </Typography>
              </div>
            ))}
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default LineChart;
