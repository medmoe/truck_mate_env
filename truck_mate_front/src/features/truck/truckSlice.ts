import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TruckInfo} from "../../types/types";
import {RootState} from '../../store';

const initialState: TruckInfo = {
    model: "",
    brand: "",
    starting_date: "",
    year: 0,
    mileage: 0,
    capacity: 0,
    isCreate: true
}

export const truckSlice = createSlice({
    name: 'truck',
    initialState,
    reducers: {
        updateId: (state, action: PayloadAction<number>) => {
            state.id = action.payload
        },
        updateIsCreate: (state, action: PayloadAction<boolean>) => {
            state.isCreate = action.payload
        },
        updateModel: (state, action: PayloadAction<string>) => {
            state.model = action.payload
        },
        updateBrand: (state, action: PayloadAction<string>) => {
            state.brand = action.payload
        },
        updateStartingDate: (state, action: PayloadAction<string>) => {
            state.starting_date = action.payload
        },
        updateYear: (state, action: PayloadAction<number>) => {
            state.year = action.payload
        },
        updateMileage: (state, action: PayloadAction<number>) => {
            state.mileage = action.payload
        },
        updateCapacity: (state, action: PayloadAction<number>) => {
            state.capacity = action.payload
        },
    }
})

export const selectId = (state: RootState) => state.truck.id;
export const selectModel = (state: RootState) => state.truck.model;
export const selectBrand = (state: RootState) => state.truck.brand;
export const selectStartingDate = (state: RootState) => state.truck.starting_date;
export const selectYear = (state: RootState) => state.truck.year;
export const selectMileage = (state: RootState) => state.truck.mileage;
export const selectCapacity = (state: RootState) => state.truck.capacity;
export const selectIsCreate = (state: RootState) => state.truck.isCreate;

export const {
    updateModel,
    updateBrand,
    updateStartingDate,
    updateYear,
    updateMileage,
    updateCapacity,
    updateIsCreate,
    updateId,
} = truckSlice.actions;

export default truckSlice.reducer;