import { Auth } from 'aws-amplify';
import React, { useEffect, useRef, useState } from 'react';
// import { useHistory } from "react-router-dom";
import { NavBarProps } from '../types'
import NavBarDesktop from './NavBarDesktop';
import NavBarMobile from './NavBarMobile';



const NavBar = ({...props}: NavBarProps) => {
    // const history = useHistory();
    // const [userName, setUserName] = useState<string>('');
    // const [userPicture, setUserPicture] = useState<string>('');

    // const anchorRef = useRef<HTMLButtonElement>(null);

    // useEffect(() => {
    //     if (typeof props.user != "undefined" && props.user.hasOwnProperty("attributes")) {
    //         let attributes = props.user.attributes
    //         setUserName(attributes.name)
    //         setUserPicture(attributes.picture)
    //     } 
    // }, [props.user]);

    // const handleCloseSignout = (event: React.MouseEvent<EventTarget>) => {
    //     if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
    //       return;
    //     }
        
    //     Auth.signOut();
    // };

    // const handleDeleteAnswers = (event: React.MouseEvent<EventTarget>) => {
    //     if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
    //       return;
    //     }
    //     setDeleteAlertOpen(true);
    // };

    // const handleConfirmDelete = (event: React.MouseEvent<EventTarget>) => {
    //     if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
    //       return;
    //     }
    //     props.callbackDelete();
    //     setDeleteAlertOpen(false);
    // };

    // const handleDisplayAnswers = (event: React.MouseEvent<EventTarget>) => {
    //     if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
    //       return;
    //     }
    //     props.setAnswerHistoryOpen(true);
    //     // setAvatarMenuOpen(false);
    // };

    // const handleCloseAlert = () => {
    //     setDeleteAlertOpen(false);
    //   };


    


    return (
        null

    )
}

export default NavBar
