import React, { useState } from 'react'
import { UserProps } from '../../types';



const UserPage = ({...props}: UserProps) => {

    const [deleteCounter, setDeleteCounter] = useState<number>(0);
    const deleteMaxCounter = 3;

    const deleteButtonPress = () => {
        setDeleteCounter(deleteCounter + 1);
        if(deleteCounter + 1 >= deleteMaxCounter){
            setDeleteCounter(0);
            props.deleteUserData();
        }
    };

    return(
        <div>
            <button onClick={props.listUserForms}>List my data</button>
            <button onClick={deleteButtonPress}>Delete my data</button>
            {deleteCounter === 0 ? "" : (deleteCounter + "/" + deleteMaxCounter + " clicks untill data is deleted...")}
        </div>
    );

};

export default UserPage;