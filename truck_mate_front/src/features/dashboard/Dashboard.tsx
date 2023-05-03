import React, {useState, useEffect} from "react";
import styles from './Dashboard.module.css'
import truck_icon from '../../assets/icons/truck.png';
import driver_icon from '../../assets/icons/driver.png';
import {NavigationBar} from "./NavigationBar";
import {Link} from "react-router-dom";


export function Dashboard() {
    return (
        <div>
            <NavigationBar/>
            <div className={styles.images_container}>
                <Link to="/truck-list"><img src={truck_icon} alt="image" className={styles.img}/></Link>
                <Link to="/driver-list"><img src={driver_icon} alt="driver" className={styles.img}/></Link>
            </div>
        </div>
    );
}