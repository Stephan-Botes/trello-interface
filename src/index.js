import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store/store';
import './index.css';
import App from './components/App';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

/*
TDL
Overall styling
Fonts       - import to index.html
Font icons  - import to index.html
 */
