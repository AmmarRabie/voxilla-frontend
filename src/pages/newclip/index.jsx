import { UploadOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Upload } from 'antd';
import axios from 'axios';
import { WaveWords } from 'components/wave-wrods';
import React, { useState } from 'react';
import reformatAlignments from './utils';
import { synthesizeText } from './server';

const NewClipPage = () => {

    const [loading, setLoading] = useState(false)
    const [alignments, setAlignments] = useState(null)
    const [src, setSrc] = useState(null)
    const [currentFileName, setCurrentFileName] = useState("")

    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            const src = URL.createObjectURL(info.file.originFileObj)
            setSrc(src)
            axios.get("http://localhost:5000/recognition$getalignment").then(response => {
                const alignments = { words: reformatAlignments(response.data.text) }
                setAlignments(alignments)
            })
        }
    };
    return (
        <div>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item key="home">Home</Breadcrumb.Item>
                <Breadcrumb.Item key="clips">My Clips</Breadcrumb.Item>
                <Breadcrumb.Item key="cid">Clip Id</Breadcrumb.Item>
            </Breadcrumb>
            <Upload
                name="file"
                listType="text"
                showUploadList={true}
                action="http://localhost:5000/upload$"

                onChange={handleChange}
            >
                <Button>
                    <UploadOutlined /> Click to Upload
                </Button>
                {currentFileName}
            </Upload>
            {alignments && <WaveWords src={src} alignments={alignments} synthesizeText={synthesizeText} />}
        </div>
    );
}

export default NewClipPage;