import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CostInfo} from "../../types/types";
import {RootState} from "../../store";

const initialState: CostInfo = {
    driver: 0,
    truck: 0,
    date: "",
    gaz_refill: 0,
    maintenance: 0,
    description: "",
}

export const costSlice = createSlice({
    name: 'cost',
    initialState,
    reducers: {
        updateDriver: (state, action: PayloadAction<number>) => {
            state.driver = action.payload
        },
        updateTruck: (state, action: PayloadAction<number>) => {
            state.truck = action.payload
        },
        updateDate: (state, action: PayloadAction<string>) => {
            state.date = action.payload
        },
        updateGazRefill: (state, action: PayloadAction<number>) => {
            state.gaz_refill = action.payload
        },
        updateMaintenance: (state, action: PayloadAction<number>) => {
            state.maintenance = action.payload
        },
        updateDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload
        },
        updateIsCreate: (state, action: PayloadAction<boolean>) => {
            state.isCreate = action.payload
        },
        updateId: (state, action: PayloadAction<number>) => {
            state.id = action.payload
        }
    }
})

export const selectId = (state: RootState) => state.cost.id;
export const selectIsCreate = (state: RootState) => state.cost.isCreate;
export const selectDriver = (state: RootState) => state.cost.driver;
export const selectTruck = (state: RootState) => state.cost.truck;
export const selectDate = (state: RootState) => state.cost.date;
export const selectGazRefill = (state: RootState) => state.cost.gaz_refill;
export const selectMaintenance = (state: RootState) => state.cost.maintenance;
export const selectDescription = (state: RootState) => state.cost.description;

export const {
    updateDriver,
    updateTruck,
    updateDate,
    updateGazRefill,
    updateMaintenance,
    updateDescription,
    updateIsCreate,
    updateId,
} = costSlice.actions;

export default costSlice.reducer;