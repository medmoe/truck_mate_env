import React, {useState} from 'react';
import styles from './Dashboard.module.css';
import {Link} from "react-router-dom";
import {API} from "../../types/types";
import {useNavigate} from "react-router-dom";
import axios from "axios";
export function NavigationBar() {
    const [isMenuOpen, setMenuOpen] = useState(false);
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
    const handleClick = () => {
        setMenuOpen(!isMenuOpen);
    }
    return (
        <div>
            <nav className={styles.nav_bar}>
                <div className={styles.logo}>
                    <p>Logo</p>
                </div>
                <ul className={`${styles.menu} ${isMenuOpen ? styles.open : ''}`}>
                    <li><Link to="/dashboard"><p>Home</p></Link></li>
                    <li><p>About</p></li>
                    <li><Link to="/dashboard" ><p>Services</p></Link></li>
                    <li><p>Contact</p></li>
                    <li><p onClick={logout}>Logout</p></li>
                </ul>
                <div className={styles.burger} onClick={handleClick}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
            </nav>
        </div>
    )
}