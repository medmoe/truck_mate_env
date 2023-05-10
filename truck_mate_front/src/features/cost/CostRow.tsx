import React from "react";
import {CostInfo} from "../../types/types";
import styles from './Cost.module.css';
import edit_icon from "../../assets/icons/writing.png";
import {useAppDispatch} from "../../hooks";
import {useNavigate} from "react-router-dom";
import {
    updateIsCreate,
    updateDate,
    updateDescription,
    updateDriver,
    updateGazRefill,
    updateId,
    updateMaintenance,
    updateTruck,
} from "./costSlice";

export function CostRow(props: CostInfo) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const updateCostState = () => {
        dispatch(updateDate(props.date));
        dispatch(updateDriver(props.driver));
        dispatch(updateTruck(props.truck));
        dispatch(updateGazRefill(props.gaz_refill));
        dispatch(updateMaintenance(props.maintenance));
        dispatch(updateDescription(props.description));
        dispatch(updateIsCreate(false));
        if (props.id !== undefined) {
            dispatch(updateId(props.id))
        }
        navigate("/add-cost");
    }
    return (
        <div className={styles.cost_row}>
            <ul>
                <li>{props.driver.last_name}</li>
                <li>{props.truck.brand} {props.truck.model}</li>
                <li>{props.date}</li>
                <li>{props.gaz_refill}</li>
                <li>{props.maintenance}</li>
                <li>{props.description}</li>
                <li><img src={edit_icon} alt="edit-info" title="edit" onClick={updateCostState}/></li>
            </ul>
        </div>
    )
}