import {useEffect} from 'react';
import logo from '../logo.svg';
import './App.css';
import Header from './Header/Header';
import {setAttribute} from '../actions/example-action';
import {connect} from 'react-redux';


const mapStateToProps = (state) => {
    return {
        attribute: state.attribute
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAttributeChange: (event) => dispatch(setAttribute(event.target.value))
    }
}

function App() {
    useEffect(() => {
        // console.log(store.getState);
    });

    return (
        <div className="App">
            <Header/>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
