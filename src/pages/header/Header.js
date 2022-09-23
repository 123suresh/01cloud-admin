import React, { Component } from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, Toolbar, Avatar, IconButton, Menu, MenuItem, Button, Divider } from '@material-ui/core';
import { withStyles,styled } from '@material-ui/core/styles';
import styleConstants from '../../theme/styleConstants'
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { logout } from '../login/redux/actions';
import { withRouter } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = theme => ({
  appBar: {
    backgroundColor: 'white',
    [ theme.breakpoints.up('lg') ]: {
      width: `calc(100% - ${ styleConstants.drawerWidth }px)`,
      marginLeft: styleConstants.drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [ theme.breakpoints.up('lg') ]: {
      display: 'none',
    }
  },
  toolbar: theme.mixins.toolbar,
  grow: {
    flexGrow: 1
  }
});

const MyButton = styled(Button)({
    background: 'none',
    border: 0,
    borderRadius: 3,
    color: '#43425D',
    height: 48,
    textTransform:'none',
    padding: '0 30px',
    '&:hover': {
        backgroundColor: 'white',
        boxShadow: 'none',
      },
});

export class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            anchorEl: null
        }
    }

    componentDidMount(){
    }

    handleMenuClick = (event) => {
        this.setState({ anchorEl : event.currentTarget });
    };
    handleMenuClose = () => {
        this.setState({ anchorEl : null });
    };

    // handleProfileClick = () => {
    //     this.handleMenuClose()
    //     this.props.history.push('/account')
    // }
    
    handleLogoutClick = () => {
        this.handleMenuClose()
        this.props.logout()
        //localStorage.removeItem('token')
        this.props.history.push('/')
    }

    render () {
        const { classes, drawerToggle, userDetails } = this.props;
        return (
            <div className={ classes.grow } data-test="main-container">
                <AppBar position="fixed" elevation={ 1 } color='transparent' className={ `${classes.appBar}` }>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            data-test="icon-button"
                            onClick={ drawerToggle }
                            className={ classes.menuButton }
                        >
                            <MenuIcon />
                        </IconButton>
                        {/* <SearchInput 
                            placeholder={t("SearchProjectsApps")}
                        /> */}
                        <div className={ classes.grow } />
                        {/* <IconButton>
                            <ForumIcon />
                        </IconButton> */}
                        {/* <IconButton>
                            <NotificationsIcon />
                        </IconButton> */}
                        <Divider orientation="vertical" variant="middle" flexItem/>
                        {/* <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={e => this.handleMenuClick(e)}>
                        </IconButton> */}
                        <MyButton disableElevation disableFocusRipple disableTouchRipple
                        data-test="user-button"
                        aria-controls="simple-menu" aria-haspopup="true" onClick={ e => this.handleMenuClick(e) }
                        >
                            { userDetails ? userDetails.first_name + ' ' + userDetails.last_name : '' } <ExpandMoreIcon />
                        </MyButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={ this.state.anchorEl }
                            open={ Boolean(this.state.anchorEl) }
                            data-test="menu"
                            onClose={ () => this.handleMenuClose() }
                            //className={classes.profileMenu}
                            getContentAnchorEl={ null }
                            anchorOrigin={ { vertical: 'bottom', horizontal: 'center' } }
                            transformOrigin={ { vertical: 'top', horizontal: 'center' } }
                        >
                            {/* <MenuItem data-test="item1" onClick={ () => this.handleProfileClick() }>Profile</MenuItem> */}
                            <MenuItem data-test="item2" onClick={ () => this.handleLogoutClick() }>Logout</MenuItem>
                        </Menu>
                        <Avatar data-test="avatar" src="./Images/profile_image.png" />
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userDetails : state.AuthReducer.user
})

const mapDispatchtoProps = dispatch => {
  return {
    logout : () => dispatch(logout()),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchtoProps
)(withStyles(useStyles)(withTranslation()(Header))))