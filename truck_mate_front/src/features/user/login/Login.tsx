import React, {FormEvent, useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import {LoginForm} from "./LoginForm";

interface UserInfo {
    username: string,
    password: string,
}

export function Login() {
    let initialState : UserInfo = {
        "username": "",
        "password": "",
    }
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState(initialState);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const options = {
            headers: {
                'content-type': 'application/json'
            },
            withCredentials: true,
        }
        await axios.post("http://localhost:8000/login/", JSON.stringify(userInfo), options)
            .then((res) => {
                localStorage.setItem('token', res.data.token)
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