import { configureStore } from "@reduxjs/toolkit";
import companiesReducer from "./slices/companiesSlice";
import sectorsReducer from "./slices/sectorsSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    companies: companiesReducer,
    sectors: sectorsReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
