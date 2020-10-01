import { AmplifySignOut } from '@aws-amplify/ui-react'
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import React from 'react'

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
      width:"150px"
    },
  }));

const NavBar = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <div className={classes.navigation}>
                        <Button variant="contained" href="/stat" className={classes.button}>Statistics</Button>
                        <Button variant="contained" href="/answer" className={classes.button}>Answers</Button>
                    </div>
                    <AmplifySignOut className={classes.logoutButton}/>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar
