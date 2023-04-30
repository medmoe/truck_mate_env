import React, {FormEvent, useEffect, useState} from "react";
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
                console.log(res)
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