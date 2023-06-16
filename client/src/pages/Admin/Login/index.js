import { useContext, useEffect, useState } from "react";

import './index.scss';
import { AuthContext } from "../../../context/AuthContext";
import { useMessage } from "../../../hooks/message.hook";
import { useHttp } from '../../../hooks/http.hook';


function AdminLogin() {
    const authContext = useContext(AuthContext);
    const message = useMessage();
    const { loading, request, error, clearError } = useHttp();
    const [form, setForm] = useState({ login: "", password: "" });

    useEffect(() => {
        clearError();
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const loginHandler = async (event) => {
        event.preventDefault();

        if (!form.login || !form.password) {
            return message.errorMessage("Fill all fields!");
        }

        try {
            await message.promiseMessage(request.bind(null, "/api/admin/auth/login", "POST", { ...form }));
            authContext.login();
        } catch { }
    }

    return (
        <div className="login-form-wrapper">
            <form onSubmit={loginHandler} className="login-form">
                <label className="login-form__label">
                    Login:
                    <input
                        placeholder="..."
                        id="login"
                        type="text"
                        name="login"
                        value={form.email}
                        onChange={changeHandler}
                        className="login-form__input"
                    />
                </label>
                <label className="login-form__label">
                    Pass:
                    <input
                        placeholder="..."
                        id="password"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={changeHandler}
                        className="login-form__input"
                    />
                </label>
                <button className="login-form__btn" type="submit" disabled={loading}>Login</button>
            </form>
        </div>
    );
}

export default AdminLogin;
