import React, { useEffect } from 'react';
import './token.css';
import { postRequest } from '../../http';
import { HTTP_URLS } from '../../http/urls';
import { TokenBody } from '../../types/auth.types';
import { getLoginKey, setLoginKey } from '../../utils/local.storage';
import { redirectToAuthServer } from '../../utils/redirect';
import { RouteComponentProps } from 'react-router';
import { ROUTER_PATHS } from '../../utils/router_paths';

type Props = RouteComponentProps<{ token: string }>;

function CheckToken(props: Props) {

    async function checkToken() {
        try {
            const token = getLoginKey() as string;
            await postRequest<TokenBody, { status: boolean }>(HTTP_URLS.CHECK_TOKEN, {
                token
            });
            setLoginKey(token)
            props.history.push(ROUTER_PATHS.DASHBOARD);
        } catch (error) {
            alert('Invalid token, you will be redirected to auth server');
            console.error(error);
            redirectToAuthServer();
        }
    }

    useEffect(() => {
        checkToken();
    });

    return (
        <div className="token__message">
            <p>Checking token</p>
        </div>
    )
}

export default CheckToken;
