import React from 'react'
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom'


export const UserDisplay = ({ }) => {
    const history = useHistory()

    const logout = () => {
        sessionStorage.removeItem("token");
        history.replace("/login")
    }
    const menu = (
        <Menu>
            <Menu.Item>
                <Button icon={<UserOutlined />} type="link" onClick={() => history.replace("/profile")}>
                    profile
                </Button>
            </Menu.Item>
            <Menu.Item>
                <Button icon={<LogoutOutlined />} type="link" onClick={logout}>
                    logout
                </Button>
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu}>
            <a style={{ float: "right" }} className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                AmmarRabie <DownOutlined />
            </a>
        </Dropdown>
    )
}