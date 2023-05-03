import React, {useState, useEffect} from 'react';
import {NavigationBar} from "../dashboard/NavigationBar";
import axios from "axios";
import {TruckInfo} from "../../types/types";
import {TruckRow} from "./TruckRow";
import styles from './Truck.module.css';
import {Link} from "react-router-dom";


export function TruckList() {
    const [trucks, setTrucks] = useState<TruckInfo[]>([])

    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchTrucks = async () => {
            axios.get("http://localhost:8000/trucks/", {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization : `Token ${token}`,
                },
                withCredentials: true
            })
                .then((res) => {
                    setTrucks(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        fetchTrucks();
    }, []);

    return (
        <div>
            <NavigationBar/>
            <div className={styles.truck_list_container}>
                <div className={styles.header}>
                    <Link to="/add-truck">
                        <button className={styles.btn}>Add Truck</button>
                    </Link>
                </div>
                <div className={styles.body}>
                    <div className={styles.truck_row}>
                        <ul>
                            <li><b>Model</b></li>
                            <li><b>Brand</b></li>
                            <li><b>Year</b></li>
                            <li><b>Mileage</b></li>
                            <li><b>Capacity</b></li>
                            <li><b>Starting Date</b></li>
                            <li></li>
                        </ul>
                    </div>
                    {trucks.map((truck) => {
                        return (
                            <React.Fragment key={truck.id}>
                                <TruckRow
                                    id={truck.id}
                                    model={truck.model}
                                    brand={truck.brand}
                                    starting_date={truck.starting_date}
                                    year={truck.year}
                                    mileage={truck.mileage}
                                    capacity={truck.capacity}
                                />
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}