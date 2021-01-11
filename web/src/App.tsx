import React, { Fragment } from 'react';

import Routes from './routes'
import { GlobalStyles } from './assets/styles/global'

function App() {
    return (
        <Fragment>
            <Routes />
            <GlobalStyles />
        </Fragment>
    );
}

export default App;
