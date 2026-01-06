// import {configureStore} from "@reduxjs/toolkit";
// import {ACCESS_TOKEN_PERSISTENT_STATE, userSlice} from "./user.slice.ts";
// import {saveState} from "./storage.ts";
//
// export const store = configureStore({
//     reducer: {
//         user: userSlice,
//     }
// });
//
// store.subscribe(() => {
//     saveState({accessToken: store.getState().user.accessToken}, ACCESS_TOKEN_PERSISTENT_STATE)
// });
//
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;