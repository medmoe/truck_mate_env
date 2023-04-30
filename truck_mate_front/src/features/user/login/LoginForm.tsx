import React, {FormEvent} from "react";
import styles from './LoginForm.module.css';

type Props = {
    handleSubmit: (event: FormEvent) => void;
    handleChange: (event: FormEvent) => void;
}

export function LoginForm(props: Props) {
    return (
        <div>
            <form className={styles.form} onSubmit={props.handleSubmit} id="login_form">
                <label className={styles.label} htmlFor="username">Username: </label>
                <input className={styles.input} type="text" id="username" name="username"
                       onChange={props.handleChange}/>
                <label className={styles.label} htmlFor="password">Password: </label>
                <input className={styles.input} type="password" id="password" name="password"
                       onChange={props.handleChange}/>
                <input className={styles.submit_btn} type="submit" value="submit" id="submit_btn"/>
                <div className={styles.labels_container}>
                    <label>Forgot password?</label>
                    <label>Create account</label>
                </div>
            </form>
        </div>
    );
}