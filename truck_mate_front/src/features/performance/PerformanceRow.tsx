import React from "react";
import {PerformanceInfo} from "../../types/types";
import styles from './Performance.module.css';
import edit_icon from "../../assets/icons/writing.png";
import {useAppDispatch} from "../../hooks";
import {useNavigate} from "react-router-dom";
import {
    updateIsCreate,
    updateDate,
    updateDriver,
    updateEndingMileage,
    updateEndingQuantity,
    updateEndingTime,
    updateId,
    updateStaringMileage,
    updateStartingQuantity,
    updateStartingTime,
    updateTruck,
} from "./performanceSlice";

export function PerformanceRow(props: PerformanceInfo) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const updatePerformanceState = () => {
        dispatch(updateDate(props.date));
        dispatch(updateDriver(props.driver));
        dispatch(updateIsCreate(false));
        dispatch(updateTruck(props.truck));
        dispatch(updateStartingQuantity(props.starting_quantity));
        dispatch(updateEndingQuantity(props.ending_quantity));
        dispatch(updateStartingTime(props.starting_time));
        dispatch(updateEndingTime(props.ending_time));
        dispatch(updateStaringMileage(props.starting_mileage));
        dispatch(updateEndingMileage(props.ending_mileage));
        if (props.id !== undefined) {
            dispatch(updateId(props.id));
        }
        navigate("/add-performance");
    }
    return (
        <div className={styles.performance_row}>
            <ul>
                <li>{props.driver}</li>
                <li>{props.truck}</li>
                <li>{props.date}</li>
                <li>{props.starting_mileage}</li>
                <li>{props.ending_mileage}</li>
                <li>{props.starting_quantity}</li>
                <li>{props.ending_quantity}</li>
                <li>{props.starting_time}</li>
                <li>{props.ending_time}</li>
                <li><img src={edit_icon} alt="edit-info" title="edit" onClick={updatePerformanceState}/></li>
            </ul>
        </div>
    )
}