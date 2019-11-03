import React, { Fragment } from 'react';
import { getLoginKey } from '../../utils/local.storage';
import { postRequest } from '../../http';
import { HTTP_URLS } from '../../http/urls';
import { TokenBody } from '../../types/auth.types';
import { redirectToAuthServer } from '../../utils/redirect';


function Dashboard() {
    async function Logout() {
        const token = getLoginKey() as string;
        alert('You will logging out from system');
        try{
            await postRequest<TokenBody, {}>(HTTP_URLS.LOGOUT, {
                token
            });
            redirectToAuthServer();
        } catch(error) {
            redirectToAuthServer();
        }
    }
    return (
        <Fragment>
            <p>Welcome hey!!</p>
            <button onClick={Logout} >Logout</button>
        </Fragment>
    )
}

export default Dashboard;
