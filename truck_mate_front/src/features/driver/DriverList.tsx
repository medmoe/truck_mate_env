import React, {useState, useEffect} from "react";
import {NavigationBar} from "../dashboard/NavigationBar";
import styles from './Driver.module.css';
import {Link} from "react-router-dom";
import {DriverInfo} from "../../types/types";
import axios from "axios";
import {DriverRow} from "./DriverRow";

export function DriverList() {
    const [drivers, setDrivers] = useState<DriverInfo[]>([])
    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchDrivers = async () => {
            axios.get("http://localhost:8000/drivers/", {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`,
                },
                withCredentials: true
            })
                .then((res) => {
                    setDrivers(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        fetchDrivers();
    }, [])
    return (
        <div>
            <NavigationBar/>
            <div className={styles.driver_list_container}>
                <div className={styles.header}>
                    <Link to="/add-driver">
                        <button className={styles.btn}>Add Driver</button>
                    </Link>
                </div>
                <div className={styles.body}>
                    <div className={styles.driver_row}>
                        <ul>
                            <li><b>First name</b></li>
                            <li><b>Last name</b></li>
                            <li><b>Date of birth</b></li>
                            <li><b>Address</b></li>
                            <li><b>Phone number</b></li>
                            <li><b>Starting date</b></li>
                            <li><b>Ending date</b></li>
                            <li></li>
                        </ul>
                    </div>
                    {drivers.map((driver) => {
                        return (
                            <React.Fragment key={driver.id}>
                                <DriverRow first_name={driver.first_name}
                                           last_name={driver.last_name}
                                           date_of_birth={driver.date_of_birth}
                                           address={driver.address}
                                           phone_number={driver.phone_number}
                                           starting_date={driver.starting_date}
                                           ending_date={driver.ending_date}
                                />
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}