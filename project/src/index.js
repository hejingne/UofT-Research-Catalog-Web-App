import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Route, BrowserRouter as Router, Redirect} from 'react-router-dom';
import Header from "./react-components/Header";
import Home from './react-components/Home/index';
import SignIn from "./react-components/SignIn";
import StudentHomePage from './react-components/StudentHomePage';

const routing = (
    <Router>
        <Header/>
        <div>
            <Route path="/home" component={Home}/>
            <Route path="/signin" component={SignIn}/>
            <Route path="/student" component={StudentHomePage}/>
            <Route exact path="/" render={() => (
                <Redirect to="/home"/>
            )}/>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
