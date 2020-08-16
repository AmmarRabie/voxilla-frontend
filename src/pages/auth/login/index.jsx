import React, { useContext, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Alert, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from 'api'
import './style.css';
import userContext from 'contexts/user';
import { useHistory } from 'react-router-dom'

const LoginPage = () => {

    const ucontext = useContext(userContext)
    const history = useHistory()

    const onFinish = async values => {
        console.log('Received values of form: ', values);
        try {
            const { token, username } = await login(values.username, values.password)
            console.log(`on the login token is ${token} and user is ${username}`);
            
            ucontext.login(token, username)
            history.replace("/projects")
        } catch (error) {
            console.log(error);
            message.error("Invalid credentials")
        }
    };


    useEffect(() => {
        const existedToken = sessionStorage.getItem("token")
        if (existedToken) {
            ucontext.login(existedToken, sessionStorage.getItem("username"))
            history.replace("/projects")
        }
    }, [])

    return (
        <Form
            name="login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
            </Button>
                Or <a href="/signup">register now!</a>
            </Form.Item>
        </Form>
    );
}

export default LoginPage;