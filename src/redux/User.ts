import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { getOrganizationNameByID } from '../helperFunctions';
import { ADMIN_COGNITOGROUP_SUFFIX, GROUPLEADER_COGNITOGROUP_SUFFIX } from '../constants';

import {UserState} from '../types';
  
const initialState = {
  userState: {
    isSignedIn: false,
    organizationID: "", 
    email: "",
    name: "" , // The actual name
    userName: "", // The cognito-generated unique identifier which is called username in cognito
    organizationName: "", 
    picture: ""
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    setUserInfo : {
      reducer: (state, action: PayloadAction<UserState>) => {
        state.userState = action.payload
      },
      prepare: (cognitoUser : any) => {
        return {
          payload : {
            isSignedIn: true,
            organizationID: cognitoUser.attributes["custom:OrganizationID"],
            email: cognitoUser.attributes["email"],
            name: cognitoUser.attributes["name"],
            userName: cognitoUser['username'],
            organizationName: getOrganizationNameByID(cognitoUser.attributes["custom:OrganizationID"]),
            picture: ("picture" in cognitoUser.attributes) ? cognitoUser.attributes.picture : ""
          }
        }
      }
    },
    setUserInfoLogOut: (state) => {
      state = initialState
    }
  }
});


export const { setUserInfo, setUserInfoLogOut } = userSlice.actions;


export default userSlice.reducer;


export const selectUserState = (state : RootState) => {
  return state.user.userState;
}


// Returns the name of the cognito-group for admins in the current users organization
export const selectAdminCognitoGroupName = (state : RootState) => {
  return state.user.userState.organizationID + ADMIN_COGNITOGROUP_SUFFIX;
}

// Returns the name of the cognito-group for groupleaders in the current users organization
export const selectGroupLeaderCognitoGroupName = (state : RootState) => {
  return state.user.userState.organizationID + GROUPLEADER_COGNITOGROUP_SUFFIX;
}
