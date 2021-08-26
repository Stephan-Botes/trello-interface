import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import InterfaceHome from './Home/InterfaceHome';
import InterfaceBoard from './Board/InterfaceBoard';

const App = () => {
    return (
        <Router>
            <div>
                <Route path='/' exact component={InterfaceHome} />
                <Route path='/:boardID' component={InterfaceBoard} />
            </div>
        </Router>
    );
};

export default App;
