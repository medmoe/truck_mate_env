import React, {useEffect, useState} from "react";
import {NavigationBar} from "../dashboard/NavigationBar";
import axios from "axios";
import {CostInfo} from "../../types/types";
import {CostRow} from "./CostRow";
import styles from './Cost.module.css';
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks";
import {updateIsCreate} from "./costSlice";

export function CostList() {
    const [costs, setCosts] = useState<CostInfo[]>([]);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchCosts = async () => {
            axios.get("http://localhost:8000/cost/", {
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Token ${token}`,
                },
                withCredentials: true
            })
                .then((res) => {
                    setCosts(res.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        fetchCosts();
    }, []);

    const updateCostState = () => {
        dispatch(updateIsCreate(true));
        navigate("/add-cost");
    }
    return (
        <div>
            <NavigationBar/>
            <div className={styles.cost_list_container}>
                <div className={styles.header}>
                        <button className={styles.btn} onClick={updateCostState}>Add Cost</button>
                </div>
                <div className={styles.body}>
                    <div className={styles.cost_row}>
                        <ul>
                            <li><b>Driver</b></li>
                            <li><b>Truck</b></li>
                            <li><b>Date</b></li>
                            <li><b>Gaz</b></li>
                            <li><b>Maintenance</b></li>
                            <li><b>description</b></li>
                            <li></li>
                        </ul>
                    </div>
                    {
                        costs.map((cost) => {
                            return (
                                <React.Fragment key={cost.id}>
                                    <CostRow driver={cost.driver}
                                             truck={cost.truck}
                                             date={cost.date}
                                             gaz_refill={cost.gaz_refill}
                                             maintenance={cost.maintenance}
                                             description={cost.description}
                                             id={cost.id}
                                    />
                                </React.Fragment>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    )
}