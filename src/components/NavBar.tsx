import { AppBar, Button, Toolbar, Avatar, Menu, MenuItem, ClickAwayListener, Popper, Grow, Paper, MenuList } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { KnowitColors } from '../styles';


const useStyles = makeStyles((theme) => ({
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
        backgroundColor: KnowitColors.darkGreen
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
    }
}));

const NavBar = (user : any) => {
    const classes = useStyles();
    const history = useHistory();
    const [userName, setUserName] = useState<string>('');
    const [userPicture, setUserPicture] = useState<string>('');
    const [avatarMenuOpen, setAvatarMenuOpen] = useState<boolean>(false);

    const anchorRef = React.useRef<HTMLButtonElement>(null);


    useEffect(() => {
        if (typeof user != "undefined" && user.user.hasOwnProperty("attributes")) {
            let attributes = user.user.attributes
            setUserName(attributes.name)
            setUserPicture(attributes.picture)
        } 
    }, [user]);

    const handleToggle = () => {
        setAvatarMenuOpen((avatarMenuPrevOpen) => !avatarMenuPrevOpen);
    };

    const handleCloseSignout = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
          return;
        }
        
        setAvatarMenuOpen(false);
        Auth.signOut();
    };

    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
          return;
        }
        
        setAvatarMenuOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
          event.preventDefault();
          setAvatarMenuOpen(false);
        }
      }

    // return focus to the button when we transitioned from !avatarMenuOpen -> avatarMenuOpen
    const avatarMenuPrevOpen = React.useRef(avatarMenuOpen);

    useEffect(() => {
        if (avatarMenuPrevOpen.current === true && avatarMenuOpen === false) {
        anchorRef.current!.focus();
        }

        avatarMenuPrevOpen.current = avatarMenuOpen;
    }, [avatarMenuOpen]);


    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.header}>
                    <div className={classes.userName}>{userName}</div>
                    
                    
                    {/* <Button variant="contained" className={classes.logoutButton} onClick={() => Auth.signOut()}>Sign out</Button>  */}
                    <div>
                    <Button
                        ref={anchorRef}
                        aria-controls={avatarMenuOpen ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                    >
                        <Avatar className={classes.userPicture} src={userPicture}
                     />
                    </Button>
                <Popper open={avatarMenuOpen} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={avatarMenuOpen} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                            <MenuItem onClick={handleCloseSignout}>Logg ut</MenuItem>
                        </MenuList>
                        </ClickAwayListener>
                    </Paper>
                    </Grow>
                )}
                </Popper>
                    </div>
                </Toolbar>
            </AppBar>
        </div>

    )
}

export default NavBar
