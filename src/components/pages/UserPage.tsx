import React from 'react'
import { UserProps } from '../../types';



const UserPage = ({...props}: UserProps) => {





    return(
        <div>
            <button onClick={props.listUserForms}>List my data</button>
            <button onClick={props.deleteUserData}>Delete my data</button>
        </div>
    );

};

export default UserPage;