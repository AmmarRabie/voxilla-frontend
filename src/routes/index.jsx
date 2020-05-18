import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ClipPage from 'pages/newclip'

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={ClipPage} />
                <Route path="/clips" exact component={ClipPage} />
                <Route path="/clip/:id" exact component={ClipPage} />
            </Switch >
        </Router>
    );
}

export default Routes;