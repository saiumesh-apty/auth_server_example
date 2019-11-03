import React, { Fragment, useState, useEffect } from 'react';


function CheckToken() {
    const [_, updateIsLoading] = useState(false);

    useEffect(() => {
        console.log('I will check token!!');
    }, []);

    function checkToken() {
        updateIsLoading(true);
    }
    return (
        <Fragment>
            <button onClick={checkToken}>Check token</button>
        </Fragment>
    )
}

export default CheckToken;
