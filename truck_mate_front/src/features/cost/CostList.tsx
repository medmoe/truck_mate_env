import React, {useEffect, useState} from "react";
import {NavigationBar} from "../dashboard/NavigationBar";
import axios from "axios";
import {CostInfo} from "../../types/types";
import {CostRow} from "./CostRow";
import styles from './Cost.module.css';
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks";
import {updateIsCreate} from "./costSlice";
import {API} from "../../types/types";
import {NUM_OF_ITEMS_PER_PAGE} from "../../types/types";
import {Pagination} from "../../utils/Pagination";

export function CostList() {
    const [costs, setCosts] = useState<CostInfo[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchCosts = async () => {
            axios.get(`${API}cost?page=${1}`, {
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Token ${token}`,
                },
                withCredentials: true
            })
                .then((res) => {
                    setCosts(res.data.results);
                    setTotalPages(Math.ceil(res.data.count / NUM_OF_ITEMS_PER_PAGE));
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        fetchCosts();
    }, []);

    const fetchCosts = async (page: number) => {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API}cost?page=${page}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            }, withCredentials: true
        });
        setCosts(response.data.results);
        setTotalPages(Math.ceil(response.data.count / NUM_OF_ITEMS_PER_PAGE));
        setCurrentPage(page);
    }

    const handlePageClick = (page: number) => {
        fetchCosts(page);
    }

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
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageClick={handlePageClick} />
            </div>
        </div>
    )
}