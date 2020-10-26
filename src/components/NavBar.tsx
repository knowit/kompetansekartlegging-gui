import { AppBar, Button, Toolbar, Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { KnowitColors } from '../styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
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
        color: KnowitColors.ecaluptus
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

    useEffect(() => {
        if (typeof user != "undefined" && user.user.hasOwnProperty("attributes")) {
            let attributes = user.user.attributes
            setUserName(attributes.name)
            setUserPicture(attributes.picture)
        } 
    }, [user]);


    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.header}>
                    <div className={classes.userName}>{userName}</div>
                    <Avatar className={classes.userPicture} src={userPicture} />
                    <Button variant="contained" className={classes.logoutButton} onClick={() => Auth.signOut()}>Sign out</Button> 
                </Toolbar>
            </AppBar>
        </div>

    )
}

export default NavBar
