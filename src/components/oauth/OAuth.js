import React, { Component } from 'react'
import { Typography, Grid, IconButton,Tooltip } from "@material-ui/core";
import GitHubIcon from '@material-ui/icons/GitHub';

class OAuth extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidMount(){
    }

    handleGithubLogin = () => {
      const qParams = [
        //`client_id=504f23be42f585885a21`,
        `client_id=${window?.config?.REACT_APP_GITHUB_CLIENTID}`,
        `redirect_uri=${window?.config?.REACT_APP_OAUTH_REDIRECT_URL}`,
        `scope=user:email`,
        //`login_hint=`,
        //`prompt=consent`,
        `state=github`
      ].join("&");
      window.location.href =  `${window?.config?.REACT_APP_GITHUB_AUTHORIZE_ENDPOINT}?${qParams}`;
    }

    render () {
      return (
        <div className='oneRemMarginTopAndoneRemBottomSeperator'>
          <Typography variant="body1">Continue with other accounts</Typography>
          <Grid align='center'>
          <Tooltip title="Github">
            <IconButton  aria-label="Github" onClick={ this.handleGithubLogin }>
                <GitHubIcon style={{ fontSize: 40, color:'black' }} />
            </IconButton>
          </Tooltip>
            {/*<IconButton color="primary" aria-label="add to shopping cart">
                <GitHubIcon />
            </IconButton>
            <IconButton color="primary" aria-label="add to shopping cart">
                <GitHubIcon />
            </IconButton> */}
          </Grid>
        </div>
      );
    }
}

export default OAuth