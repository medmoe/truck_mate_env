import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DriverInfo} from "../../types/types";
import {RootState} from "../../store";

const initialState: DriverInfo = {
    first_name: "",
    last_name: "",
    date_of_birth: "",
    address: "",
    phone_number: "",
    starting_date: "",
    ending_date: "",
    isCreate: true
}

export const driverSlice = createSlice({
    name: 'driver',
    initialState,
    reducers: {
        updateFirstName: (state, action: PayloadAction<string>) => {
            state.first_name = action.payload
        },
        updateLastName: (state, action: PayloadAction<string>) => {
            state.last_name = action.payload
        },
        updateDateOfBirth: (state, action: PayloadAction<string>) => {
            state.date_of_birth = action.payload
        },
        updateAddress: (state, action: PayloadAction<string>) => {
            state.address = action.payload
        },
        updatePhoneNumber: (state, action: PayloadAction<string>) => {
            state.phone_number = action.payload
        },
        updateStartingDate: (state, action: PayloadAction<string>) => {
            state.starting_date = action.payload
        },
        updateEndingDate: (state, action: PayloadAction<string>) => {
            state.ending_date = action.payload
        },
        updateIsCreate: (state, action: PayloadAction<boolean>) => {
            state.isCreate = action.payload
        },
        updateId: (state, action: PayloadAction<number>) => {
            state.id = action.payload
        }
    }
})

export const selectId = (state: RootState) => state.driver.id;
export const selectFirstName = (state: RootState) => state.driver.first_name;
export const selectLastName = (state: RootState) => state.driver.last_name;
export const selectDateOfBirth = (state: RootState) => state.driver.date_of_birth;
export const selectAddress = (state: RootState) => state.driver.address;
export const selectPhoneNumber = (state: RootState) => state.driver.phone_number;
export const selectStartingDate = (state: RootState) => state.driver.starting_date;
export const selectEndingDate = (state: RootState) => state.driver.ending_date;
export const selectIsCreate = (state: RootState) => state.driver.isCreate;

export const {
    updateFirstName,
    updateLastName,
    updateDateOfBirth,
    updateAddress,
    updatePhoneNumber,
    updateStartingDate,
    updateEndingDate,
    updateIsCreate,
    updateId,
} = driverSlice.actions;

export default driverSlice.reducer;