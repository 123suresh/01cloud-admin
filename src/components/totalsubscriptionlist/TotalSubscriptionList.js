import React from "react";
import clsx from "clsx";
//import moment from "moment";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  //CardActions,
  CardHeader,
  CardContent,
  //Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
//import ArrowRightIcon from "@material-ui/icons/ArrowRight";

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  statusContainer: {
    display: "flex",
    alignItems: "center",
  },
  status: {
    marginRight: theme.spacing(1),
  },
  actions: {
    justifyContent: "flex-end",
  },
}));

const TotalSubscriptionList = (props) => {
  const { data, className, ...rest } = props;

  const classes = useStyles();

  //const [orders] = useState();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Subscriptions" />
      <Divider />
      <CardContent className={classes.content}>
        <div className={classes.inner}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Count</TableCell>
                <TableCell>Revenue</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.data &&
                data.data.map((sub, ind) => (
                  <TableRow key={ind}>
                    <TableCell>{sub.Name}</TableCell>
                    <TableCell>${sub.Price}</TableCell>
                    <TableCell>{sub.Count}</TableCell>
                    <TableCell>${sub.Revenue}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <Divider />
      {/* <CardActions className={classes.actions}>
        <Button color="primary" size="small" variant="text">
          View all <ArrowRightIcon />
        </Button>
      </CardActions> */}
    </Card>
  );
};

TotalSubscriptionList.propTypes = {
  className: PropTypes.string,
};

export default TotalSubscriptionList;
