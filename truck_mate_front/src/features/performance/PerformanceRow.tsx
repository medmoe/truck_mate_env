import React from "react";
import {PerformanceInfo} from "../../types/types";
import styles from './Performance.module.css';
import edit_icon from "../../assets/icons/writing.png";

export function PerformanceRow (props: PerformanceInfo) {
    return (
        <div className={styles.performance_row}>
            <ul>
                <li>{props.driver}</li>
                <li>{props.truck}</li>
                <li>{props.date}</li>
                <li>{props.starting_quantity}</li>
                <li>{props.ending_quantity}</li>
                <li>{props.starting_time}</li>
                <li>{props.ending_time}</li>
                <li><img src={edit_icon} alt="edit-info" title="edit" /></li>
            </ul>
        </div>
    )
}