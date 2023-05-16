import React, {FormEvent, useState} from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import {LoginForm} from "./LoginForm";
import {useAppDispatch} from "../../../hooks";
import {updateDrivers, updateTrucks, updateUserId} from "../userSlice";
import {API} from "../../../types/types";

interface UserInfo {
    username: string,
    password: string,
}

export function Login() {
    let initialState : UserInfo = {
        "username": "",
        "password": "",
    }
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [userInfo, setUserInfo] = useState(initialState);
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const options = {
            headers: {
                'content-type': 'application/json'
            },
            withCredentials: true,
        }
        await axios.post(`${API}login/`, JSON.stringify(userInfo), options)
            .then((res) => {
                dispatch(updateUserId(res.data.user_id));
                dispatch(updateDrivers(res.data.drivers));
                dispatch(updateTrucks(res.data.trucks));
                localStorage.setItem("token", res.data.token)
                navigate('/dashboard')
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const handleChange = (event: FormEvent) => {
        event.preventDefault();
        const target = event.target as HTMLInputElement
        setUserInfo({
            ...userInfo,
            [target.name]: target.value,
        })
    }
    return (
        <>
            <LoginForm handleSubmit={handleSubmit} handleChange={handleChange} />
        </>
    )
}