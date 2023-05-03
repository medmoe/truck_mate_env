import React from 'react';
import styles from './Dashboard.module.css';
import {Link} from "react-router-dom";

export function NavigationBar() {
    return (
        <div>
            <nav className={styles.nav_bar}>
                <div className={styles.logo}>
                    <a href="#">Logo</a>
                </div>
                <ul className={styles.menu}>
                    <li><Link to="/dashboard"><a href="#">Home</a></Link></li>
                    <li><a href="#">About</a></li>
                    <li><Link to="/dashboard" ><a href="#">Services</a></Link></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">Logout</a></li>
                </ul>
                <div className={styles.burger}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
            </nav>
        </div>
    )
}