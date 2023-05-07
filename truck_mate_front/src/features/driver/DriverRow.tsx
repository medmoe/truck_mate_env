import React from 'react';
import {DriverInfo} from "../../types/types";
import styles from './Driver.module.css'
import writing_icon from '../../assets/icons/writing.png'
import {useAppDispatch} from "../../hooks";
import {useNavigate} from "react-router-dom";
import {
    updateFirstName,
    updateLastName,
    updateDateOfBirth,
    updateAddress,
    updateStartingDate,
    updateEndingDate,
    updatePhoneNumber,
    updateIsCreate, updateId
} from "./driverSlice";

export function DriverRow(props: DriverInfo) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const updateDriverState = () => {
        dispatch(updateIsCreate(false));
        dispatch(updateFirstName(props.first_name));
        dispatch(updateLastName(props.last_name));
        dispatch(updateDateOfBirth(props.date_of_birth));
        dispatch(updateAddress(props.address));
        dispatch(updateStartingDate(props.starting_date));
        dispatch(updateEndingDate(props.ending_date));
        dispatch(updatePhoneNumber(props.phone_number));
        if (props.id !== undefined) {
            dispatch(updateId(props.id));
        }
        navigate("/add-driver");
    }
    return (
        <div className={styles.driver_row}>
            <ul>
                <li>{props.first_name}</li>
                <li>{props.last_name}</li>
                <li>{props.date_of_birth}</li>
                <li>{props.address}</li>
                <li>{props.phone_number}</li>
                <li>{props.starting_date}</li>
                <li>{props.ending_date}</li>
                <li><img src={writing_icon} alt="edit-info" title="edit" onClick={updateDriverState}/></li>
            </ul>
        </div>
    )
}