import React from 'react';
import {TruckInfo} from "../../types/types";
import styles from './Truck.module.css';
import writing_icon from "../../assets/icons/writing.png";
import {useAppDispatch} from "../../hooks";
import {useNavigate} from "react-router-dom";
import {
    updateModel,
    updateBrand,
    updateCapacity,
    updateIsCreate,
    updateMileage,
    updateStartingDate,
    updateYear,
    updateId
} from "./truckSlice";

export function TruckRow(props: TruckInfo) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const updateTruckState = () => {
        dispatch(updateIsCreate(false));
        dispatch(updateBrand(props.brand));
        dispatch(updateModel(props.model));
        dispatch(updateStartingDate(props.starting_date));
        dispatch(updateYear(props.year));
        dispatch(updateMileage(props.mileage));
        dispatch(updateCapacity(props.capacity));
        if (props.id !== undefined) {
            dispatch(updateId(props.id));
        }
        navigate("/add-truck");
    }
    return (
        <div className={styles.truck_row}>
            <ul>
                <li>{props.model}</li>
                <li>{props.brand}</li>
                <li>{props.year}</li>
                <li>{props.mileage}</li>
                <li>{props.capacity}</li>
                <li>{props.starting_date}</li>
                <li><img src={writing_icon} alt="edit-info" title="edit" onClick={updateTruckState}/></li>
            </ul>
        </div>
    )
}