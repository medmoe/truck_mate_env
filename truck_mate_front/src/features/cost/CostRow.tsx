import React from "react";
import {CostInfo} from "../../types/types";
import styles from './Cost.module.css';
import edit_icon from "../../assets/icons/writing.png";

export function CostRow (props: CostInfo) {
    return (
        <div className={styles.cost_row}>
            <ul>
                <li>{props.driver}</li>
                <li>{props.truck}</li>
                <li>{props.date}</li>
                <li>{props.gaz_refill}</li>
                <li>{props.maintenance}</li>
                <li>{props.description}</li>
                <li><img src={edit_icon} alt="edit-info" title="edit" /> </li>
            </ul>
        </div>
    )
}