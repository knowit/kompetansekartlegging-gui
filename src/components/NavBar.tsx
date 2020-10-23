import { AppBar, Button, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Auth } from 'aws-amplify';
import React from 'react'
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
    }
}));

const NavBar = () => {
    const classes = useStyles();
    const history = useHistory();

    function handleClick(path: string) {
        history.push(path);
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.header}>
                    <div className={classes.navigation}>
                        {/* <Button variant="contained" onClick={() => handleClick("/home")} className={classes.button}>Home</Button>
                        <Button variant="contained" onClick={() => handleClick("/stats")} className={classes.button}>Statistics</Button>
                        <Button variant="contained" onClick={() => handleClick("/answer")} className={classes.button}>Answers</Button>
                        <Button variant="contained" onClick={() => handleClick("/user")} className={classes.button}>User</Button>
                        <Button variant="contained" onClick={() => handleClick("/admin")} className={classes.button}>Admin</Button> */}
                    </div>
                    <Button variant="contained" className={classes.logoutButton} onClick={() => Auth.signOut()}>Sign out</Button> 
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar
