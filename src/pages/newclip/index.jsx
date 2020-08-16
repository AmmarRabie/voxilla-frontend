import { UploadOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Upload, Space, Row, Col } from 'antd';
import axios from 'axios';
import { WaveWords } from 'components/wave-wrods';
import React, { useState, useRef, useEffect } from 'react';
import reformatAlignments from './utils';
import { synthesizeText } from './server';

const NewClipPage = ({ location }) => {

    const { clip } = location
    const audioExist = clip && clip.fileUri
    const utoken = sessionStorage.getItem("token")

    const [loading, setLoading] = useState(false)
    const [alignments, setAlignments] = useState(null)
    const [src, setSrc] = useState(clip.fileUri)
    const [uploaded, setUploaded] = useState(audioExist)
    const [currentFileName, setCurrentFileName] = useState("")

    const uploadBtnRef = useRef(null)


    useEffect(() => {
        // auto click if no file exist for better user experience
        if (!uploaded) uploadBtnRef.current.click()
    }, [uploaded])

    useEffect(() => {
        // get the file from the clip
        if (clip.fileUri) {
            console.log("make the request");
            // axios.get(`http://localhost:5000/clips/${clip.id}/download`, { responseType: "blob", headers: { 'x-access-token': utoken } })
            //     .then(res => { console.log(`useEffect setting the source with ${res.data}`); setSrc(URL.createObjectURL(res.data)) })
            axios.get(`http://localhost:5000/clips/${clip.id}/download`, { responseType: "arraybuffer", headers: { 'x-access-token': utoken } })
                .then(res => setSrc(res.data))
        }
    }, [])

    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            const src = URL.createObjectURL(info.file.originFileObj)
            console.log(`handleChange setting the source with ${src}`);
            setSrc(src)
            setUploaded(true)
        }
    };
    const getAlignments = () => {
        axios.get(`http://localhost:5000/clips/${clip.id}/recognize`, { headers: { 'x-access-token': utoken } }).then(response => {
            const alignments = { words: reformatAlignments(response.data.text) }
            console.log(alignments)
            setAlignments(alignments)
        })
    }

    return (
        <div>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item key="home">Home</Breadcrumb.Item>
                <Breadcrumb.Item key="clips">My clips</Breadcrumb.Item>
                <Breadcrumb.Item key="cid">Clip Id</Breadcrumb.Item>
            </Breadcrumb>
            <Upload
                name="file"
                listType="text"
                showUploadList={false}
                action={`http://localhost:5000/clips/${clip.id}/upload`}
                headers={{ "x-access-token": utoken }}
                onChange={handleChange}
            >
                <Button ref={uploadBtnRef} hidden={audioExist || uploaded}> <UploadOutlined /> Click to Upload </Button>

            </Upload>

            <div style={{ alignContent: "right" }}>
                <Space>
                    <Button hidden={!uploaded} onClick={getAlignments} style={{ float: "right" }} type="default">recognize words</Button>
                    <Button hidden={!uploaded} style={{ float: "right" }} type="primary">Save Changes</Button>
                </Space>
            </div>
            {alignments && <WaveWords src={src} alignments={alignments} synthesizeText={(oldWord, newWord) => synthesizeText(utoken, clip.id, oldWord, newWord)} />}
        </div>
    );
}

export default NewClipPage;