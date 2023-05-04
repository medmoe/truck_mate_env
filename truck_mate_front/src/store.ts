import {configureStore, ThunkAction, Action} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import rootReducer from "./rootReducer";
import userReducer from '../src/features/user/userSlice';

export const store = configureStore({
        reducer: {
            user: userReducer,
        }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;