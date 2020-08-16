import React, { useState } from 'react';
// import logo from './logo.svg';
import "antd/dist/antd.css";
import './App.css';
import { Layout, Menu } from 'antd';
import {
  BrowserRouter as Router, Link
} from "react-router-dom";
import Routes from "routes"
import { UserDisplay } from 'components/user-display';
import { useHistory } from 'react-router-dom'
import userContext from 'contexts/user';

const App = () => {

  const pathnameToKeysMap = { "/projects": "projects", "/about": "about", "/demo": "demo" }
  const selected = pathnameToKeysMap[window.location.pathname] || null

  // const username = sessionStorage.getItem("username")
  const [user, setUser] = useState({ token: sessionStorage.getItem("token"), username: sessionStorage.getItem("username") })
  const history = useHistory()

  const logout = () => {
    setUser({})
    sessionStorage.removeItem("token") // persist data over reloading
    sessionStorage.removeItem("username")
  }
  const login = (token, username) => {
    setUser({ token, username })
    sessionStorage.setItem("token", token) // persist data over reloading
    sessionStorage.setItem("username", username)
  }

  return (
    <Layout className="layout">
      <userContext.Provider value={{ user, login, logout }}>
        <Router>
          <Layout.Header>
            {/* <Avatar shape="square" size={64} src="logo192.png" /> */}
            <img src="/logo.png" className="logo" />
            <Menu selectedKeys={selected ? [selected] : null} theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
              <Menu.Item key="projects" > <Link to="/projects">Projects</Link></Menu.Item>
              <Menu.Item key="about"><Link to="/about">About</Link></Menu.Item>
              <Menu.Item key="demo"><Link to="/demo">Live demo</Link></Menu.Item>
              {user.username && <UserDisplay username={user.username} onLogOut={logout} />}
            </Menu>
          </Layout.Header>
          <Layout.Content style={{ padding: '0 50px' }}>
            <Routes />
          </Layout.Content>
          <Layout.Footer style={{ textAlign: 'center' }}>Voxilla ©2020 Created by Voxilla team at CUFE</Layout.Footer>
        </Router>
      </userContext.Provider>
    </Layout>
  );
}



export default App;
