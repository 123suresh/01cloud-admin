import React from "react";

import Chart from "react-apexcharts";

import { makeStyles } from "@material-ui/styles";
import {
  // FormControl,
  Paper,
  Typography,
  // MenuItem,
  // Select,
  // Grid,
  // CircularProgress,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  div: {
    fontFamily: "sans-serif",
    textAlign: "center",
    padding: "15px 0",
    display: "flex",
    flexDirection: "column",
  },
  paper: {
    padding: "15px 10px 15px",
    borderRadius: 2,
  },
  title: {
    fontWeight: 400,
    marginBottom: 10,
    fontSize: 17,
  },
  // grid: {
  //   display: "flex",
  //   justifyContent: "flex-end",
  //   margin: "20px 0 25px"
  // },
  // select: {
  //   paddingTop: 10,
  //   paddingBottom: 10,
  // },
  // formControl: {
  //   flexDirection: "row",
  //   alignItems: "center"
  // },
  // loader: {
  //   marginRight: 10,
  //   animationDuration: '550ms',
  // },
}));

export const TimeSeriesGraph = (props) => {
  // const [range, setRange] = useState(60);
  
  // const handleChange = e => {
  //   setRange(e.target.value);
  //   props.handleTimeChange(e.target.value);
  // }

  const classes = useStyles();

  const series = [];
  const timeStamps = Object.entries(props.data)[0][1].values.map((a) =>
    new Date(a[0] * 1000).toISOString()
  );
  
  for(let e in props.data) {
    let _valueArray = props.data[e].values.map((a) => {
      let _val = a[1];
      _val = (e === "cpu_usages") ? _val / (10 ** 9) : _val / (1024 ** 3);
      // _val = (_val / props.data[e].total) * 100;
      return _val;
    });
    series.push({name: props.data[e].label, data: _valueArray})
  }

  const data = {
    series: series,
    options: {
      chart: {
        type: "area",
      },
      colors: [props.color ?? "#1A73E8"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
        width: 2,
      },
      xaxis: {
        type: "datetime",
        categories: timeStamps,
        labels: {
          datetimeUTC: false,
          rotate: -45,
          format: "hh:mm:ss",
        },
      },
      yaxis: {
        title: {
          text: props.yLabel,
        },
        labels: {
          formatter: (val) => parseInt(val),
        },
        // tickAmount: 6,
        max: props.total,
        min: 0
      },
      tooltip: {
        x: {
          format: "dd/MM/yy hh:mm TT",
        },
        y: {
          formatter: (val, { seriesIndex }) => {
            if (typeof val === "undefined") return "";
            // let _total = Object.entries(props.data)[seriesIndex][1].total;
            // let _used = ((val / 100) * _total).toFixed(2)
            let _unit = Object.entries(props.data)[seriesIndex][1].unit;
            // return val.toFixed(2) + `% (${_used} ${_unit})`
            return `${val.toFixed(2)} ${_unit}`;
          }
        },
      },
      legend: {
        showForSingleSeries: true,
        fontSize: "14px",
        height: 40,
        position: "top",
        horizontalAlign: "left",
      },
      markers: {
        size: 2,
      },
    },
  };

  return (
    <div className={classes.div}>
      <Paper elevation={2} className={classes.paper}>
        <Typography variant="h5" className={classes.title}>
          {props.title}
        </Typography>
        {/* <Grid className={classes.grid}>
          <FormControl variant="outlined" className={classes.formControl}>
            {
              props.loading &&
                <CircularProgress className={classes.loader} size={25} thickness={4} />
            }
            <Select
              id="demo-simple-select-outlined"
              value={range}
              onChange={handleChange}
              labelWidth={0}
              classes={{root: classes.select}}
              disabled={props.loading}
            >
              <MenuItem value={5}>Last 5 minutes</MenuItem>
              <MenuItem value={15}>Last 15 minutes</MenuItem>
              <MenuItem value={30}>Last 30 minutes</MenuItem>
              <MenuItem value={1 * 60}>Last 1 hour</MenuItem>
              <MenuItem value={3 * 60}>Last 3 hours</MenuItem>
              <MenuItem value={6 * 60}>Last 6 hours</MenuItem>
              <MenuItem value={12 * 60}>Last 12 hours</MenuItem>
              <MenuItem value={24 * 60}>Last 24 hours</MenuItem>
              <MenuItem value={2 * 24 * 60}>Last 2 days</MenuItem>
              <MenuItem value={7 * 24 * 60}>Last 7 days</MenuItem>
            </Select>
          </FormControl>
        </Grid> */}
        <Chart
          options={data.options}
          series={data.series}
          height={300}
          width="100%"
          type="area"
        />
      </Paper>
    </div>
  );
};
