import { AppBar, Button, Toolbar, Avatar, Menu, MenuItem, ClickAwayListener, Popper, Grow, Paper, MenuList } from '@material-ui/core'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { KnowitColors } from '../styles';
import { NavBarProps } from '../types'
import NavBarDesktop from './NavBarDesktop';
import NavBarMobile from './NavBarMobile';



const NavBar = ({...props}: NavBarProps) => {
    const history = useHistory();
    const [userName, setUserName] = useState<string>('');
    const [userPicture, setUserPicture] = useState<string>('');
    const [deleteAlertOpen, setDeleteAlertOpen] = useState<boolean>(false);

    const anchorRef = React.useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (typeof props.user != "undefined" && props.user.hasOwnProperty("attributes")) {
            let attributes = props.user.attributes
            setUserName(attributes.name)
            setUserPicture(attributes.picture)
        } 
    }, [props.user]);

    const handleCloseSignout = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
          return;
        }
        
        Auth.signOut();
    };

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
        props.callbackDelete();
        setDeleteAlertOpen(false);
    };

    const handleDisplayAnswers = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
          return;
        }
        props.setAnswerHistoryOpen(true);
        // setAvatarMenuOpen(false);
    };

    const handleCloseAlert = () => {
        setDeleteAlertOpen(false);
      };


    


    return (
        props.isMobile ?
            <NavBarMobile 
                handleDeleteAnswers={handleDeleteAnswers}
                handleConfirmDelete={handleConfirmDelete}
                handleDisplayAnswers={handleDisplayAnswers}
                handleCloseAlert={handleCloseAlert}
                handleCloseSignout={handleCloseSignout}
                anchorRef={anchorRef}
                userName={userName}
                userPicture={userPicture}
                deleteAlertOpen={deleteAlertOpen}
                openOverview={props.openOverview}
                openScaleDescription={props.openScaleDescription}
                openMyAnswers={props.openMyAnswers}
                currentSiteName={props.currentSiteName}
            
            />
        :
            <NavBarDesktop 
                handleDeleteAnswers={handleDeleteAnswers}
                handleConfirmDelete={handleConfirmDelete}
                handleDisplayAnswers={handleDisplayAnswers}
                handleCloseAlert={handleCloseAlert}
                anchorRef={anchorRef}
                userName={userName}
                userPicture={userPicture}
                deleteAlertOpen={deleteAlertOpen}
            />
            

    )
}

export default NavBar
