import React, {useState, useEffect} from "react";
import {NavigationBar} from "../dashboard/NavigationBar";
import axios from "axios";
import {PerformanceInfo} from "../../types/types";
import {PerformanceRow} from "./PerformanceRow";
import styles from './Performance.module.css';
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks";
import {updateIsCreate} from "./performanceSlice";

export function PerformanceList() {
    const [performances, setPerformances] = useState<PerformanceInfo[]>([]);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

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
    const updatePerformanceState = () => {
        dispatch(updateIsCreate(true));
        navigate("/add-performance");
    }
    return (
        <div>
            <NavigationBar/>
            <div className={styles.performance_list_container}>
                <div className={styles.header}>
                    <button className={styles.btn} onClick={updatePerformanceState}>Add Performance</button>
                </div>
                <div className={styles.body}>
                    <div className={styles.performance_row}>
                        <ul>
                            <li><b>Driver</b></li>
                            <li><b>Truck</b></li>
                            <li><b>Date</b></li>
                            <li><b>Starting Km</b></li>
                            <li><b>Ending Km</b></li>
                            <li><b>Starting Qty/L</b></li>
                            <li><b>Ending Qty/L</b></li>
                            <li><b>Starting T</b></li>
                            <li><b>Ending T</b></li>
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
                                                    ending_time={performance.ending_time}
                                                    id={performance.id}
                                                    starting_mileage={performance.starting_mileage}
                                                    ending_mileage={performance.ending_mileage}/>
                                </React.Fragment>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}
