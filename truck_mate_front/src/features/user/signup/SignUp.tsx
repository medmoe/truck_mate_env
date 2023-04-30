import React, {FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {SignUpForm} from "./SignUpForm";
import {useNavigate} from "react-router-dom";

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

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (!userInfo.username || !userInfo.email || !userInfo.password){
            setErrorMessage("Please fill the fields!")
            return;
        }
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
        await axios.post("http://localhost:8000/signup/", JSON.stringify(userInfo), options)
            .then((res) => {
                localStorage.setItem('token', res.data.token);
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