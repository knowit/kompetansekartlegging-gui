
import { AppBar, Toolbar, IconButton, Typography, List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { KnowitColors } from '../styles';
import { NavBarPropsMobile } from '../types';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import {isIOS} from 'react-device-detect';


const drawerWidth = 240;

const navbarStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,

    drawer: {
        [theme.breakpoints.up('sm')]: {
          width: drawerWidth,
          flexShrink: 0,
        },
    },
    drawerPaper: {
        width: drawerWidth,
      },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    root: {
        flexGrow: 1,
        zIndex: 100
    },
    navigation: {
        flexGrow: 1,
    },
    logoutButton: {
        marginRight: theme.spacing(2),
    },
    button: {
        width: "100px"
    },
    header: {
        backgroundColor: KnowitColors.beige,
        boxShadow: 'none',
        color: KnowitColors.darkBrown
    },
    userName: {
        margin: "5px",
        fontFamily: "Arial",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "20px",
        lineHeight: "23px",
        color: KnowitColors.ecaluptus,
        marginLeft: "auto"
    },
    userPicture: {
        margin: "5px",
        width: "44px",
        height: "44px",
    },
    headerText: {
        fontWeight: 700,
    },
    list: {
        width: 250,
      },
}));


const NavBarMobile = ({...props}: NavBarPropsMobile) => {
    const style = navbarStyles();
    // const [mobileOpen, setMobileOpen] = React.useState(false);
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    // const handleDrawerToggle = () => {
    //   setMobileOpen(!mobileOpen);
    // };

    const toggleDrawer = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
      ) => {
        if (
          event &&
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
    
        setDrawerOpen(open);
    };
    
    
      const list = () => (
        <div
          className={style.list}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
            {/* TODO: mappe denne ut heller */}
           <List>
            {props.menuButtons}
          </List>
        </div>
      );
    

    return (
        <div className={style.root}>
            <AppBar position="static" className={style.header}>
                <Toolbar>
                    <IconButton 
                        edge="start" 
                        className={style.menuButton} 
                        color="inherit" 
                        aria-label="menu" 
                        onClick={toggleDrawer(true)}
                    >
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap className={style.headerText}>
                        {/* AKTIV */}
                        {/* {props.currentSiteName} */}
                    </Typography>
                </Toolbar> 
            </AppBar>

            {/* <nav className={style.drawer} aria-label="mailbox folders"> */}
                <SwipeableDrawer
                    disableBackdropTransition={!isIOS} 
                    disableDiscovery={isIOS}
                    anchor={'left'}
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                >
                    {list()}
                </SwipeableDrawer>
            {/* </nav> */}
        </div>
    );
}


export default NavBarMobile
