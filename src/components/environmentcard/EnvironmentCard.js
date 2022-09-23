import React from 'react';
import { Paper, Grid } from '@material-ui/core';
//import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { makeStyles } from '@material-ui/styles';
//import LinearProgress from '@material-ui/core/LinearProgress';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    root:{
        marginTop: 20
    },
    avatar: {
        color: "blue",
        backgroundColor: "red"
    },
    shortTitle: {
        background: "white",
        border: "1px solid #0057fa",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 30,
        height: 30
    },
    container: {
        display: "flex",
        padding: "1rem",
        alignItems: "center",
        justifyContent: "space-between"
    },
    progress: {
        margin: "7px 20px 0px 20px",
        borderRadius: 20,
    },
    titleContainer: {
        flex: 1
    }
}));

const EnvironmentCard = (props) => {
    const { details } = props;
    const classes = useStyles();
  return (
      <Grid item md={4} xs={12}>
        <Paper elevation={3}>
            {/* <Link href={`/environment/${details.ID}`} underline='none'> */}
            <Link to={ {
                                      pathname: '/environment/' +  details.id,
                                      state: { details }
                                    } } style={{textDecoration:'none'}}
            >
                <div className={classes.container}>
                    <div className={classes.shortTitle}>
                        <p className='projectSmallTitle'>{ details.name !== "" && details.name.charAt(0).toUpperCase() }</p>
                    </div>
                    <div className={classes.titleContainer}>
                        <span className='projectTitle'>{details.name}</span>
                        {/* <span className='apps'>{ details.resource ? details.resource.cores : 0 } core/{ details.resource ? details.resource.memory : 0 } GB/{ details.replicas } Replica</span> */}
                        {/* <LinearProgress className={classes.progress} variant="determinate" value='50' color="secondary" /> */}
                    </div>
                    {/* <MoreHorizIcon /> */}
                </div>
            </Link>
        </Paper>
      </Grid>
  )
}

export default EnvironmentCard