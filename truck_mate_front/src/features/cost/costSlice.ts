import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CostInfo, DriverInfo, TruckInfo} from "../../types/types";
import {RootState} from "../../store";

const initialState: CostInfo = {
    driver: {first_name: "", last_name: "", date_of_birth: "", address: "", phone_number: "", starting_date: "", ending_date: ""},
    truck: {model: "", brand: "", mileage: 0, capacity: 0, starting_date: "", year: 0},
    date: "",
    gaz_refill: 0,
    maintenance: 0,
    description: "",
}

export const costSlice = createSlice({
    name: 'cost',
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