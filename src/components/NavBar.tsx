import { AmplifySignOut } from '@aws-amplify/ui-react'
import { AppBar, Button, Toolbar } from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import React from 'react'
import { useHistory } from "react-router-dom";

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
      width:"100px"
    },
  }));

const NavBar = () => {
    const classes = useStyles();
    const history = useHistory();

    function handleClick(path: string){
        history.push(path);
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <div className={classes.navigation}>
                        <Button variant="contained" onClick={() => handleClick("/")} className={classes.button}>Home</Button>
                        <Button variant="contained" onClick={() => handleClick("/stats")} className={classes.button}>Statistics</Button>
                        <Button variant="contained" onClick={() => handleClick("/answer")}  className={classes.button}>Answers</Button>
                        <Button variant="contained" onClick={() => handleClick("/user")}  className={classes.button}>User</Button>
                        <Button variant="contained" onClick={() => handleClick("/admin")}  className={classes.button}>Admin</Button>
                    </div>
                    <AmplifySignOut className={classes.logoutButton}/>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar
