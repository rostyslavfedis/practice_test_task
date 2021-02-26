import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {Navigation} from "./components/Navigation";
import Books from "./components/Books";
import Home from "./components/Home";


export default function App(props) {

    return (
        <Router>
            <Navigation/>
            <div className='container pt-4'>
                <Switch>
                    <Route path='/' exact {...props} component={Home}/>
                    <Route path='/books' exact {...props} component={Books}/>

                </Switch>
            </div>
        </Router>

    );
}

