import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PerformanceInfo, DriverInfo, TruckInfo} from "../../types/types";
import {RootState} from "../../store";

const initialState: PerformanceInfo = {
    driver: {first_name: "", last_name: "", date_of_birth: "", address: "", phone_number: "", starting_date: "", ending_date: ""},
    truck: {model: "", brand: "", mileage: 0, capacity: 0, starting_date: "", year: 0},
    date: "",
    starting_quantity: 0,
    ending_quantity: 0,
    starting_time: "",
    ending_time: "",
    starting_mileage: 0,
    ending_mileage: 0,
}

export const performanceSlice = createSlice({
    name: 'performance',
    initialState,
    reducers: {
        updateDriver: (state, action: PayloadAction<DriverInfo>) => {
            state.driver = action.payload
        },
        updateTruck: (state, action: PayloadAction<TruckInfo>) => {
            state.truck = action.payload
        },
        updateDate: (state, action: PayloadAction<string>) => {
            state.date = action.payload
        },
        updateStartingQuantity: (state, action: PayloadAction<number>) => {
            state.starting_quantity = action.payload
        },
        updateEndingQuantity: (state, action: PayloadAction<number>) => {
            state.ending_quantity = action.payload
        },
        updateStartingTime: (state, action: PayloadAction<string>) => {
            state.starting_time = action.payload
        },
        updateEndingTime: (state, action: PayloadAction<string>) => {
            state.ending_time = action.payload
        },
        updateIsCreate: (state, action: PayloadAction<boolean>) => {
            state.isCreate = action.payload
        },
        updateId: (state, action: PayloadAction<number>) => {
            state.id =action.payload
        },
        updateStaringMileage: (state, action: PayloadAction<number>) => {
            state.starting_mileage = action.payload
        },
        updateEndingMileage: (state, action: PayloadAction<number>) => {
            state.ending_mileage = action.payload
        }
    }
})

export const selectId = (state: RootState) => state.performance.id;
export const selectIsCreate = (state: RootState) => state.performance.isCreate;
export const selectDriver = (state: RootState) => state.performance.driver;
export const selectTruck = (state: RootState) => state.performance.truck;
export const selectDate = (state: RootState) => state.performance.date;
export const selectStartingQuantity = (state: RootState) => state.performance.starting_quantity;
export const selectEndingQuantity = (state: RootState) => state.performance.ending_quantity;
export const selectStartingTime = (state: RootState) => state.performance.starting_time;
export const selectEndingTime = (state: RootState) => state.performance.ending_time;
export const selectStartingMileage = (state: RootState) => state.performance.starting_mileage;
export const selectEndingMileage = (state: RootState) => state.performance.ending_mileage;

export const {
    updateDriver,
    updateTruck,
    updateDate,
    updateStartingQuantity,
    updateEndingQuantity,
    updateStartingTime,
    updateEndingTime,
    updateIsCreate,
    updateId,
    updateEndingMileage,
    updateStaringMileage,
} = performanceSlice.actions;

export default performanceSlice.reducer;