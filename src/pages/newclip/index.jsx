import React, { Component } from 'react';
import { Breadcrumb, PageHeader } from 'antd';
import { WaveList } from 'components/wave-wrods/WaveList'
import Word from 'components/wave-wrods/Word';
import { Col, Row } from 'antd';



class NewClipPage extends Component {
    render() {
        return (
            <div>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>My Clips</Breadcrumb.Item>
                    <Breadcrumb.Item>Clip Id</Breadcrumb.Item>
                </Breadcrumb>
                {/* <WaveList src={"audio/sonnet.mp3"} /> */}
                {/* <Row gutter={[24, 24]}> */}
                {/* <Col span={3}> */}
                <Word />


            </div>
        );
    }
}

export default NewClipPage;