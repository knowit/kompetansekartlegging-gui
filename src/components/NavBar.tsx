import { AppBar, Button, Toolbar, Avatar, Menu, MenuItem, ClickAwayListener, Popper, Grow, Paper, MenuList } from '@material-ui/core'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { KnowitColors } from '../styles';
import { UserFormList } from '../types'
import * as helper from '../helperFunctions'
import * as mutations from '../graphql/mutations';
import * as customQueries from '../graphql/custom-queries';


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

// Inserted here temporarily: listUserForms & deleteUserData

const deleteUserData = async () => {
    let userForms = (await helper.callGraphQL<UserFormList>(customQueries.listUserFormsWithAnswers)).data;
    let deleteResult = [];
    if(userForms && userForms.listUserForms.items.length > 0){
        for(let i = 0; i < userForms.listUserForms.items.length; i++) {
            for(const answer of userForms.listUserForms.items[i].questionAnswers.items){
                deleteResult.push((await helper.callGraphQL(mutations.deleteQuestionAnswer, {input: {"id": answer.id}})));
            }
            deleteResult.push((await helper.callGraphQL(mutations.deleteUserForm, {input: {"id": userForms.listUserForms.items[i].id}})));
        }
        console.log(deleteResult);
    } else console.log("No Userforms active");
};

const listUserForms = async () => {
    let userForms = (await helper.callGraphQL<UserFormList>(customQueries.listUserFormsWithAnswers)).data;
    console.log(userForms);
};

const NavBar = (user : any) => {
    const classes = useStyles();
    const history = useHistory();
    const [userName, setUserName] = useState<string>('');
    const [userPicture, setUserPicture] = useState<string>('');
    const [avatarMenuOpen, setAvatarMenuOpen] = useState<boolean>(false);
    const [deleteAlertOpen, setDeleteAlertOpen] = useState<boolean>(false);

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

    const handleDeleteAnswers = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
          return;
        }
        setDeleteAlertOpen(true);
    };

    const handleConfirmDelete = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
          return;
        }
        deleteUserData();
        setDeleteAlertOpen(false);
    };


    const handleDisplayAnswers = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
          return;
        }
        listUserForms();
        setAvatarMenuOpen(false);
    };

    const handleCloseAlert = () => {
        setDeleteAlertOpen(false);
      };

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
                <Popper
                    open={avatarMenuOpen}
                    anchorEl={anchorRef.current}
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
                            <MenuItem onClick={handleDisplayAnswers}>Vis alle lagrede svar</MenuItem>
                            <MenuItem onClick={handleDeleteAnswers}>Slett alle svar</MenuItem>
                            <MenuItem onClick={handleCloseSignout}>Logg ut</MenuItem>
                        </MenuList>
                        </ClickAwayListener>
                    </Paper>
                    </Grow>
                )}
                </Popper>
                <Dialog
                    open={deleteAlertOpen}
                    onClose={handleCloseAlert}
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
                    <Button onClick={handleConfirmDelete} color="primary">
                        Bekreft
                    </Button>
                    <Button onClick={handleCloseAlert} color="primary" autoFocus>
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

export default NavBar
