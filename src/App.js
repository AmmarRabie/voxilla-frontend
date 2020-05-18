import React from 'react';
// import logo from './logo.svg';
import "antd/dist/antd.css";
import './App.css';
import "waveform-playlist/styles/playlist.scss"
import { Layout, Menu, Avatar } from 'antd';

import Routes from "routes"

function App() {
  return (
    <Layout className="layout">
      <Layout.Header>
        {/* <Avatar shape="square" size={64} src="logo192.png" /> */}
        <img src="logo.png" className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">Home</Menu.Item>
          <Menu.Item key="2">About</Menu.Item>
          <Menu.Item key="3">Profile</Menu.Item>
        </Menu>
      </Layout.Header>
      <Layout.Content style={{ padding: '0 50px' }}>
        <Routes />
      </Layout.Content>
      <Layout.Footer style={{ textAlign: 'center' }}>Voxilla ©2020 Created by Voxilla team at CUFE</Layout.Footer>
    </Layout>
  );
}



export default App;
