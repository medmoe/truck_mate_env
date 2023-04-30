import React, {FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {SignUpForm} from "./SignUpForm";

interface UserInfo {
    first_name: string,
    last_name: string,
    email: string,
    username: string,
    pass1: string,
    pass2: string,
}

export function SignUp() {
    let initialState : UserInfo = {
        "first_name": "",
        "last_name":"",
        "email": "",
        "username": "",
        "pass1": "",
        "pass2": "",
    }
    const [userInfo, setUserInfo] = useState(initialState);

    const handleSubmit = (event: FormEvent) => {

    }
    const handleChange = (event: FormEvent) => {

    }
    return (
        <>
            <SignUpForm handleSubmit={handleSubmit} handleChange={handleChange} />
        </>
    )
}