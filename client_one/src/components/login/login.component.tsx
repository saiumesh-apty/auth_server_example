import React, { useState, ChangeEvent } from 'react';
import { Login as LoginInterface } from '../../types/auth.types';
import { postRequest } from '../../http';
import { HTTP_URLS } from '../../http/urls';
import { RouteComponentProps } from 'react-router';

import './login.css'
import { setLoginKey } from '../../utils/local.storage';
import { ROUTER_PATHS } from '../../utils/router_paths';

type Props = RouteComponentProps;

function Login(props: Props) {
    const [userData, updateUserData] = useState<LoginInterface>({
        email: '', password: ''
    });
    async function onLogin() {
        try {
            const token = await postRequest<LoginInterface, string>(HTTP_URLS.LOGIN, userData);
            setLoginKey(token);
            props.history.push(ROUTER_PATHS.LOGIN);
        } catch (error) {
            console.error(error);
        }
    }

    function onInputChange(key: keyof LoginInterface, value: ChangeEvent<HTMLInputElement>) {
        updateUserData({
            ...userData,
            [key]: value.target.value
        })
    }

    return (
        <div className="login__form">
            <input
                type="email"
                placeholder="email"
                value={userData.email}
                onChange={(e) => onInputChange('email', e)}
            />
            <input
                type="password"
                placeholder="password"
                value={userData.password}
                onChange={(e) => onInputChange('password', e)}
            />
            <button
                onClick={onLogin}
            >Login</button>
        </div>
    )
}

export default Login;