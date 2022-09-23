import React from 'react';
//import { Card, CardContent, CardHeader , Divider } from '@material-ui/core';
// import { makeStyles } from '@material-ui/styles';
import './loader.css';

// const useStyles = makeStyles(() => ({
    
// }));

export const Loader = () => {
    //const classes = useStyles();
    return (
        <div>
            <div data-test="main-container">
                <div className="lds-ellipsis">
                    <img src="/images/logos/logo-white.svg" alt="01 loader" data-test="icon" className='loader_icon'/>
        
                    <div></div><div></div><div></div><div></div>
                </div>
            </div>   

        </div>
    )
};

export default Loader;
