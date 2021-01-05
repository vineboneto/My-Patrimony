import React, { Fragment } from 'react';

import Routes from './routes'

import { GlobalStyles } from './assets/styles/global'

// import './assets/styles/global.css'

function App() {
    return (
        <Fragment>
            <Routes />
            <GlobalStyles />
        </Fragment>
    );
}

export default App;
