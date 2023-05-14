import React from "react";
import styles from './Dashboard.module.css'
import truck_icon from '../../assets/icons/truck.png';
import driver_icon from '../../assets/icons/driver.png';
import performance_icon from '../../assets/icons/performance.png';
import cost_icon from '../../assets/icons/reduction.png';
import {NavigationBar} from "./NavigationBar";
import {Link} from "react-router-dom";


export function Dashboard() {
    return (
        <div>
            <NavigationBar/>
            <div className={styles.images_container}>
                <Link to="/truck-list">
                    <img src={truck_icon} alt="truck" className={styles.img} title="trucks"/>
                </Link>
                <Link to="/driver-list">
                    <img src={driver_icon} alt="driver" className={styles.img} title="drivers"/>
                </Link>
                <Link to="/performance-list">
                    <img src={performance_icon} alt="performance" className={styles.img} title="performances"/>
                </Link>
                <Link to="/cost-list">
                    <img src={cost_icon} alt="cost" className={styles.img} title="expenses"/>
                </Link>
            </div>
        </div>
    );
}