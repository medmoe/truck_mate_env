import React, {useState, useEffect} from 'react';
import {NavigationBar} from "../dashboard/NavigationBar";
import axios from "axios";
import {TruckInfo, API, NUM_OF_ITEMS_PER_PAGE} from "../../types/types";
import {TruckRow} from "./TruckRow";
import styles from './Truck.module.css';
import {useAppDispatch} from "../../hooks";
import {updateIsCreate} from "./truckSlice";
import {useNavigate} from "react-router-dom";
import {Pagination} from "../../utils/Pagination";

export function TruckList() {
    const [trucks, setTrucks] = useState<TruckInfo[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchTrucks = async () => {
            await axios.get(`${API}trucks?page=${currentPage}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`,
                },
                withCredentials: true
            })
                .then((res) => {
                    setTrucks(res.data.results);
                    setTotalPages(Math.ceil(res.data.count / NUM_OF_ITEMS_PER_PAGE));
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        fetchTrucks();
    }, [currentPage]);

    const fetchTrucks = async (page: number) => {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API}trucks?page=${page}`, {
            headers: {
                'Content-Type': "application/json",
                Authorization: `Token ${token}`,
            }, withCredentials: true
        })
        setTrucks(response.data.results);
        setTotalPages(Math.ceil(response.data.count / NUM_OF_ITEMS_PER_PAGE));
        setCurrentPage(page);
    }

    const handlePageClick = (page: number) => {
        fetchTrucks(page);
    }
    const updateTruckState = () => {
        dispatch(updateIsCreate(true));
        navigate("/add-truck");
    }
    return (
        <div>
            <NavigationBar/>
            <div className={styles.truck_list_container}>
                <div className={styles.header}>
                    <button className={styles.btn} onClick={updateTruckState}>Add Truck</button>
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
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageClick={handlePageClick} />
            </div>
        </div>
    )
}