import React, {FormEvent, useState} from "react";
import axios from "axios";
import {SignUpForm} from "./SignUpForm";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../hooks";
import {updateDrivers, updateUserId, updateTrucks} from "../userSlice";
import {API} from "../../../types/types";

interface UserInfo {
    first_name: string,
    last_name: string,
    email: string,
    username: string,
    password: string,
    pass2?: string,
}

export function SignUp() {
    let initialState : UserInfo = {
        "first_name": "",
        "last_name":"",
        "email": "",
        "username": "",
        "password": "",
        "pass2": "",
    }
    const [userInfo, setUserInfo] = useState(initialState);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (userInfo.password !== userInfo.pass2) {
            setErrorMessage("Password didn't match!")
            return;
        }
        const options = {
            headers: {
                'content-type': 'application/json'
            },
            withCredentials: true,
        }
        delete userInfo.pass2;
        await axios.post(`${API}signup/`, JSON.stringify(userInfo), options)
            .then((res) => {
                dispatch(updateDrivers(res.data.drivers));
                dispatch(updateTrucks(res.data.trucks));
                dispatch(updateUserId(res.data.user_id));
                localStorage.setItem("token", res.data.token)
                navigate('/dashboard')

            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleChange = (event: FormEvent) => {
        event.preventDefault()
        const target = event.target as HTMLInputElement
        setUserInfo({
            ...userInfo,
            [target.name]: target.value
        })
    }
    return (
        <>
            <SignUpForm handleSubmit={handleSubmit} handleChange={handleChange} />
            <h1>{errorMessage}</h1>
        </>
    )
}