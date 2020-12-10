
import { AppBar, Button, Toolbar, Avatar, Menu, MenuItem, ClickAwayListener, Popper, Grow, Paper, MenuList } from '@material-ui/core'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { KnowitColors } from '../styles';
import { NavBarProps, NavBarPropsDesktop } from '../types'



const navbarStyles = makeStyles((theme) => ({
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


const NavBarDesktop = ({...props}: NavBarPropsDesktop) => {
    const [avatarMenuOpen, setAvatarMenuOpen] = useState<boolean>(false);
    // return focus to the button when we transitioned from !avatarMenuOpen -> avatarMenuOpen
    const avatarMenuPrevOpen = React.useRef(avatarMenuOpen);
    const style = navbarStyles();



    const handleToggle = () => {
        setAvatarMenuOpen((avatarMenuPrevOpen) => !avatarMenuPrevOpen);
    };

    const handleCloseSignout = (event: React.MouseEvent<EventTarget>) => {
        if (props.anchorRef.current && props.anchorRef.current.contains(event.target as HTMLElement)) {
          return;
        }
        
        setAvatarMenuOpen(false);
        Auth.signOut();
    };

    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (props.anchorRef.current && props.anchorRef.current.contains(event.target as HTMLElement)) {
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

      useEffect(() => {
        if (avatarMenuPrevOpen.current === true && avatarMenuOpen === false) {
        props.anchorRef.current!.focus();
        }

        avatarMenuPrevOpen.current = avatarMenuOpen;
    }, [avatarMenuOpen]);

    return (
            <div className={style.root}>
                <AppBar position="static">
                    <Toolbar className={style.header}>
                        <div className={style.userName}>{props.userName}</div>

                        {/* <Button variant="contained" className={classes.logoutButton} onClick={() => Auth.signOut()}>Sign out</Button>  */}
                        <div>
                            <Button
                                ref={props.anchorRef}
                                aria-controls={avatarMenuOpen ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={handleToggle}
                            >
                                <Avatar className={style.userPicture} src={props.userPicture}
                            />
                            </Button>
                            <Popper
                                open={avatarMenuOpen}
                                anchorEl={props.anchorRef.current}
                                placement={"bottom-end"}
                                role={undefined}
                                transition
                                disablePortal
                            >
                            {({ TransitionProps, placement }) => (
                                <Grow
                                {...TransitionProps}
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={avatarMenuOpen} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                        <MenuItem onClick={props.handleDisplayAnswers}>Vis alle lagrede svar</MenuItem>
                                        <MenuItem onClick={props.handleDeleteAnswers}>Slett alle svar</MenuItem>
                                        <MenuItem onClick={handleCloseSignout}>Logg ut</MenuItem>
                                    </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                                </Grow>
                            )}
                            </Popper>
                            <Dialog
                                open={props.deleteAlertOpen}
                                onClose={props.handleCloseAlert}
                                aria-labelledby="dialogtitle"
                                aria-describedby="dialogdescription"
                            >
                                <DialogTitle id="dialogtitle">
                                    {"Ønsker du å slette svarene dine?"}
                                </DialogTitle>
                                <DialogContent>
                                <DialogContentText id="dialogdescription">
                                    OBS: Dette vil slette alle innsendte og lagrede svar!
                                </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={props.handleConfirmDelete} color="primary">
                                    Bekreft
                                </Button>
                                <Button onClick={props.handleCloseAlert} color="primary" autoFocus>
                                    Avbryt
                                </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        )
}


export default NavBarDesktop
