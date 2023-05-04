import React, {useState, useEffect} from "react";
import {NavigationBar} from "../dashboard/NavigationBar";
import axios from "axios";
import {PerformanceInfo} from "../../types/types";
import {PerformanceRow} from "./PerformanceRow";
import styles from './Performance.module.css';
import {Link} from "react-router-dom";

export function PerformanceList() {
    const [performances, setPerformances] = useState<PerformanceInfo[]>([]);
    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchPerformances = async () => {
            axios.get("http://localhost:8000/performance/", {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`,
                },
                withCredentials: true
            })
                .then((res) => {
                    setPerformances(res.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        fetchPerformances();
    }, [])
    return (
        <div>
            <NavigationBar/>
            <div className={styles.performance_list_container}>
                <div className={styles.header}>
                    <Link to="/add-performance">
                        <button className={styles.btn}>Add Performance</button>
                    </Link>
                </div>
                <div className={styles.body}>
                    <div className={styles.performance_row}>
                        <ul>
                            <li><b>Driver</b></li>
                            <li><b>Truck</b></li>
                            <li><b>Date</b></li>
                            <li><b>Starting quantity</b></li>
                            <li><b>Ending quantity</b></li>
                            <li><b>Starting time</b></li>
                            <li><b>Ending time</b></li>
                            <li></li>
                        </ul>
                    </div>
                    {
                        performances.map((performance) => {
                            return (
                                <React.Fragment key={performance.id}>
                                    <PerformanceRow driver={performance.driver} truck={performance.truck}
                                                    date={performance.date}
                                                    starting_quantity={performance.starting_quantity}
                                                    ending_quantity={performance.ending_quantity}
                                                    starting_time={performance.starting_time}
                                                    ending_time={performance.ending_time}/>
                                </React.Fragment>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}
