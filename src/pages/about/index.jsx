import { Breadcrumb } from 'antd';
import React from 'react';

const AboutPage = () => {

    return (
        <div>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item key="home">Home</Breadcrumb.Item>
                <Breadcrumb.Item key="clips">About</Breadcrumb.Item>
            </Breadcrumb>
            About page
        </div>
    );
}

export default AboutPage;