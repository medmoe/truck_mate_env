import React, {useState, useEffect} from "react";
import styles from './Dashboard.module.css'


export function Dashboard() {
    useEffect(() => {
        console.log("fetch list of trucks")
    }, [])
    return (
        <div>
            <nav className={styles.nav_bar}>
                <div className={styles.logo}>
                    <a href="#">Logo</a>
                </div>
                <ul className={styles.menu}>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a> </li>
                    <li><a href="#">Services</a> </li>
                    <li><a href="#">Contact</a> </li>
                    <li><a href="#">Logout</a> </li>
                </ul>
                <div className={styles.burger}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
            </nav>
        </div>
    );
}