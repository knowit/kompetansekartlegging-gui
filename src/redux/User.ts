import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { getOrganizationNameByID } from '../helperFunctions';
import { ADMIN_COGNITOGROUP_SUFFIX, GROUPLEADER_COGNITOGROUP_SUFFIX } from '../constants';

import {UserState, UserRole} from '../types';
  
const initialState = {
  userState: {
    isSignedIn: false,
    organizationID: "", 
    email: "",
    name: "" , // The actual name
    userName: "", // The cognito-generated unique identifier which is called username in cognito
    organizationName: "", 
    picture: "",
    roles: [UserRole.NormalUser]
  }
};

const hasRole = (role: string, cognitoGroups: Array<string>) => {
  for(const group of cognitoGroups){
    const splitGroup = group.split('0');
    if(splitGroup.length > 1 && splitGroup[splitGroup.length - 1] === role){
        return true;
    }
  }
  return false;
};
const isAdmin = (cognitoGroups : Array<string>) => hasRole("admin", cognitoGroups);
const isGroupLeader = (cognitoGroups : Array<string>) => hasRole("groupLeader", cognitoGroups);
const isSuperAdmin = (cognitoGroups : Array<string>) => {
  return cognitoGroups.includes('admin');
};

const userToRoles = (user: any): UserRole[] => {
  const roles = [UserRole.NormalUser];
  let cognitoGroups : Array<string> = [];
  try{
    cognitoGroups = user.signInUserSession.idToken.payload["cognito:groups"];
  }catch(err){
    console.error('Could not find the cognito groups of the user');
    return roles;
  }

  if(cognitoGroups === undefined){
    console.error('Could not find the cognito groups of the user');
    return roles;
  }

  if(isSuperAdmin(cognitoGroups)){
    roles.push(UserRole.SuperAdmin);
  };
  if (isAdmin(cognitoGroups)){
    roles.push(UserRole.Admin)
  };
  if (isGroupLeader(cognitoGroups)){
    roles.push(UserRole.GroupLeader)
  };

  return roles;
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
            picture: ("picture" in cognitoUser.attributes) ? cognitoUser.attributes.picture : "",
            roles: userToRoles(cognitoUser)
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
};

export const selectIsSuperAdmin = (state : RootState) => {
  return state.user.userState.roles.includes(UserRole.SuperAdmin);
};

export const selectIsAdmin = (state : RootState) => {
  return state.user.userState.roles.includes(UserRole.Admin);
};

export const selectIsGroupLeader = (state : RootState) => {
  return state.user.userState.roles.includes(UserRole.GroupLeader);
}

// Returns the name of the cognito-group for admins in the current users organization
export const selectAdminCognitoGroupName = (state : RootState) => {
  return state.user.userState.organizationID + ADMIN_COGNITOGROUP_SUFFIX;
};

// Returns the name of the cognito-group for groupleaders in the current users organization
export const selectGroupLeaderCognitoGroupName = (state : RootState) => {
  return state.user.userState.organizationID + GROUPLEADER_COGNITOGROUP_SUFFIX;
};