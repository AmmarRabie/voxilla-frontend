import React from 'react'
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom'


export const UserDisplay = ({ username, onLogOut }) => {
    const history = useHistory()

    const menu = (
        <Menu>
            <Menu.Item>
                <Button icon={<UserOutlined />} type="link" onClick={() => history.replace("/profile")}>
                    profile
                </Button>
            </Menu.Item>
            <Menu.Item>
                <Button icon={<LogoutOutlined />} type="link" onClick={() => { onLogOut(); history.replace("/login"); }}>
                    logout
                </Button>
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu}>
            <a style={{ float: "right" }} className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                {username} <DownOutlined />
            </a>
        </Dropdown>
    )
}