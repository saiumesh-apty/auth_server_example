import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { postRequest } from '../../http';
import { TokenBody } from '../../types/auth.types';
import { HTTP_URLS } from '../../http/urls';
import { setLoginKey } from '../../utils/local.storage';
import { redirectToAuthServer } from '../../utils/redirect';
import { ROUTER_PATHS } from '../../utils/router_paths';

type Props = RouteComponentProps<{ token: string }>;

function ValidateToken(props: Props) {

    async function checkToken() {
        try {
            const token = props.match.params.token;
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
        <p>I will validate token {props.match.params.token}</p>
    )
}

export default ValidateToken;
