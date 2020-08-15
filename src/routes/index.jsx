import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ClipPage from 'pages/newclip'
import LoginPage from 'pages/auth/login'
import SignupPage from 'pages/auth/signup'
import ProjectsPage from 'pages/projects';
import ProjectPage from 'pages/project';
import AboutPage from 'pages/about';
import DemoPage from 'pages/demo';

const Routes = ({ children }) => {
    return (
        <Switch>
            <Route path="/" exact component={LoginPage} />
            <Route path="/demo" exact component={DemoPage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/signup" exact component={SignupPage} />
            <Route path="/about" exact component={AboutPage} />
            <Route path="/projects" exact component={ProjectsPage} />
            <Route path="/projects/:id" exact component={ProjectPage} />
            <Route path="/clips/:id" exact component={ClipPage} />
        </Switch >
    );
}

export default Routes;