import React from 'react';
import {DriverInfo} from "../../types/types";
import styles from './Driver.module.css'
import writing_icon from '../../assets/icons/writing.png'
export function DriverRow(props: DriverInfo) {
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
                <li><img src={writing_icon} alt="edit-info" title="edit"/></li>
            </ul>
        </div>
    )
}