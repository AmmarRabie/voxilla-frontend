import React, { useContext } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { signup } from 'api'
import userContext from 'contexts/user';
import { useHistory } from 'react-router-dom'


const SignupPage = () => {

    const ucontext = useContext(userContext)
    const history = useHistory()

    const onFinish = async values => {
        // signup
        console.log('Received values of form: ', values);
        try {
            const { token, username } = await signup(values.username, values.email, values.password)
            ucontext.login(token, username)
            history.replace("/projects")
        } catch (error) {
            console.log(error);
            message.error("email already exists")
        }
    };

    return (
        <Form
            style={{ marginLeft: "auto", marginRight: "auto", marginTop: "50px" }}
            name="signup"
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
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your email!',
                        type: "email",
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="email"
                    placeholder="email"
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Signup
            </Button>
                Or if you <a href="/login">have an account?</a>
            </Form.Item>
        </Form>
    );
}

export default SignupPage;