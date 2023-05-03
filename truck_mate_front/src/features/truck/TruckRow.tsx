import React from 'react';
import {TruckInfo} from "../../types/types";
import styles from './Truck.module.css';

export function TruckRow (props: TruckInfo) {
    return (
        <div className={styles.truck_row}>
            <ul>
                <li>{props.model}</li>
                <li>{props.brand}</li>
                <li>{props.year}</li>
                <li>{props.mileage}</li>
                <li>{props.capacity}</li>
                <li>{props.starting_date}</li>
            </ul>
        </div>
    )
}