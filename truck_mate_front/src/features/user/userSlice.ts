import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DriverInfo} from "../../types/types";
import {TruckInfo} from "../../types/types";
import {RootState} from "../../store";

export interface UserState {
    user_id?: number,
    drivers: DriverInfo[],
    trucks: TruckInfo[],
}

const initialState: UserState = {
    drivers: [],
    trucks: [],
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        updateUserId: (state, action: PayloadAction<number>) => {
            state.user_id = action.payload;
        },
        updateDrivers: (state, action: PayloadAction<DriverInfo[]>) => {
            state.drivers = action.payload;
        },
        updateTrucks: (state, action: PayloadAction<TruckInfo[]>) => {
            state.trucks = action.payload;
        }
    }
})

export const selectUserId = (state: RootState) => state.user.user_id;
export const selectDrivers = (state: RootState) => state.user.drivers;
export const selectTrucks = (state: RootState) => state.user.trucks;

export const {
    updateUserId,
    updateDrivers,
    updateTrucks,
} = userSlice.actions;

export default userSlice.reducer;
