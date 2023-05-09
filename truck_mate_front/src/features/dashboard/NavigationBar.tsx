import React from 'react';
import styles from './Dashboard.module.css';
import {Link} from "react-router-dom";
import {API} from "../../types/types";
import {useNavigate} from "react-router-dom";
import axios from "axios";
export function NavigationBar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const logout = async () => {
        await axios.post(`${API}logout/`, {}, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            }, withCredentials: true
        })
            .then((res) => {
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
            })
    }
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
                    <li><a href="#" onClick={logout}>Logout</a></li>
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