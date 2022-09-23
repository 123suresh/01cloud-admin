import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Grid, Typography, Avatar } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import EcoIcon from "@material-ui/icons/Eco";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  content: {
    alignItems: "center",
    display: "flex",
  },
  title: {
    fontWeight: 700,
  },
  avatar: {
    backgroundColor: theme.palette.success.main,
    height: 56,
    width: 56,
  },
  icon: {
    height: 32,
    width: 32,
  },
  difference: {
    marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "center",
  },
  differenceIconGrowth: {
    color: theme.palette.success.dark,
  },
  differenceIconFall: {
    color: theme.palette.error.dark,
  },
  differenceValueGrowth: {
    color: theme.palette.success.dark,
    marginRight: theme.spacing(1),
  },
  differenceValueFall: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1),
  },
}));

const TotalEnvironmentsCard = (props) => {
  const { data, className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              TOTAL ENVIRONMENTS
            </Typography>
            <Typography variant="h3">{data && data.total}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <EcoIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          {(data && data?.growth) ? (
            <ArrowUpwardIcon className={classes.differenceIconGrowth} />
          ) : (
            <ArrowDownwardIcon className={classes.differenceIconFall} />
          )}
          <Typography
            className={
              (data && data?.growth)
                ? classes.differenceValueGrowth
                : classes.differenceValueFall
            }
            variant="body2"
          >
            {data && data.this_month} {data && data.total}
          </Typography>
          <Typography className={classes.caption} variant="caption">
            Since last month
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

TotalEnvironmentsCard.propTypes = {
  className: PropTypes.string,
};

export default TotalEnvironmentsCard;
