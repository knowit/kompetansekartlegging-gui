import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { getOrganizationNameByID } from '../helperFunctions';

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