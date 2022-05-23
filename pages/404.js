import React, {useEffect} from 'react';
import Router from "next/router";

const Page404 = () => {
    useEffect(() => {
        // Router.push('/connect/app', '/connect/app');
        Router.push('/app', '/app');
    }, []);

    return null;
}

export default Page404;
