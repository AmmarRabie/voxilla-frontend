import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Alert, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { login } from 'api'
import './style.css';

const LoginPage = (props) => {

    const onFinish = async values => {
        console.log('Received values of form: ', values);
        try {
            const token = await login(values.username, values.password)
            sessionStorage.setItem("token", token)
            console.log(`token set ${token}`);
            props.history.push("/home")
        } catch (error) {
            console.log(error);
            message.error("Invalid credentials")
        }
    };


    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            console.log(sessionStorage.getItem("token"))
            props.history.push("/home")
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