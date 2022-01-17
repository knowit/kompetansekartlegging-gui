import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { getOrganizationNameByID } from '../helperFunctions';
import { ADMIN_COGNITOGROUP_SUFFIX, GROUPLEADER_COGNITOGROUP_SUFFIX } from '../constants';

export interface UserState {
  isSignedIn: boolean
  organizationID: string,
  email: string,
  userName: string,
  organizationName: string
  picture: string
}
  
const initialState = {
  userState: {
    isSignedIn: false,
    organizationID: "",
    email: "",
    userName: "" ,
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
            userName: cognitoUser.attributes["name"],
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
