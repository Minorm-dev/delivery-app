// import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
//
// export const ACCESS_TOKEN_PERSISTENT_STATE = 'access_token';
//
// export interface UserPersistentState {
//     accessToken: string | null;
// }
//
// export interface userState {
//     accessToken: string | null;
// }
//
// const initialState: userState = {
//     accessToken: localStorage.getItem(ACCESS_TOKEN_PERSISTENT_STATE) || null
// };
//
// export const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//         addAccessToken: (state, action: PayloadAction<string>) => {
//             state.accessToken = action.payload;
//         },
//         logout: (state) => {
//             state.accessToken = null;
//         }
//     }
// })
//
// export default userSlice.reducer;
// export const userActions = userSlice.actions;