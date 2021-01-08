import React, { Fragment } from 'react';

import Routes from './routes'
import { GlobalStyles } from './assets/styles/global'
import { Provider } from 'react-redux'
import store from 'stores';

function App() {
    return (
        <Fragment>
            <Provider store={store}>
                <Routes />
                <GlobalStyles />
            </Provider>
        </Fragment>
    );
}

export default App;
