import React, {useState, useEffect} from "react";
import {NavigationBar} from "../dashboard/NavigationBar";
import styles from './Driver.module.css';
import {DriverInfo, API, NUM_OF_ITEMS_PER_PAGE} from "../../types/types";
import axios from "axios";
import {DriverRow} from "./DriverRow";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks";
import {updateIsCreate} from "./driverSlice";
import {Pagination} from "../../utils/Pagination";

export function DriverList() {
    const [drivers, setDrivers] = useState<DriverInfo[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const updateDriverState = () => {
        dispatch(updateIsCreate(true));
        navigate("/add-driver");
    }
    useEffect(() => {

        const token = localStorage.getItem("token");
        const fetchDrivers = async () => {
            axios.get(`${API}drivers?page=${1}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`,
                },
                withCredentials: true
            })
                .then((res) => {
                    setDrivers(res.data.results)
                    setTotalPages(Math.ceil(res.data.count / NUM_OF_ITEMS_PER_PAGE));
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        fetchDrivers();
    }, [])
    const fetchDrivers = async (page: number) => {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API}drivers?page=${page}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
            withCredentials: true
        });
        setDrivers(response.data.results)
        setTotalPages(Math.ceil(response.data.count / NUM_OF_ITEMS_PER_PAGE));
        setCurrentPage(page);
    }
    const handlePageClick = (page: number) => {
        fetchDrivers(page);
    }
    return (
        <div>
            <NavigationBar/>
            <div className={styles.driver_list_container}>
                <div className={styles.header}>
                    <button className={styles.btn} onClick={updateDriverState}>Add Driver</button>
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
                                           id={driver.id}
                                />
                            </React.Fragment>
                        )
                    })}
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageClick={handlePageClick}
                />
            </div>

        </div>
    )
}