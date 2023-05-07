import {configureStore, ThunkAction, Action} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import userReducer from '../src/features/user/userSlice';
import truckReducer from '../src/features/truck/truckSlice';
import driverReducer from '../src/features/driver/driverSlice';

export const store = configureStore({
        reducer: {
            user: userReducer,
            truck: truckReducer,
            driver: driverReducer,
        }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;