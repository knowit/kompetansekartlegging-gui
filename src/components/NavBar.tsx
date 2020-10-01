import { AmplifySignOut } from '@aws-amplify/ui-react'
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

const NavBar = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton> */}
                    <Typography variant="h6" className={classes.title}>
                        News
                    </Typography>
                    <AmplifySignOut/>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar
