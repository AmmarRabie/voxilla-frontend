import { UploadOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Upload, Space, Row, Col, message } from 'antd';
import axios from 'axios';
import { WaveWords } from 'components/wave-wrods';
import React, { useState, useRef, useEffect } from 'react';
import reformatAlignments from './utils';
import { synthesizeText } from './server';

const NewClipPage = ({ location }) => {

    const { clip } = location
    const audioExist = clip && clip.fileUri
    const alignmentsExist = clip && clip.alignments
    const utoken = sessionStorage.getItem("token")

    const [loading, setLoading] = useState(false)
    const [alignments, setAlignments] = useState(clip.alignments)
    const [src, setSrc] = useState(clip.fileUri)
    const [uploaded, setUploaded] = useState(audioExist)
    const [recognized, setRecognized] = useState(audioExist && alignmentsExist)

    const uploadBtnRef = useRef(null)

    const key = "message_key" // message loading key 

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
        if (clip.fileUri && !alignmentsExist) {
            getAlignments()
        }
    }, [])

    const saveChanges = () => {
        
    }

    const download = () => {
        
    }

    const handleChange = info => {
        if (info.file.status === 'uploading') {
            message.loading({ content: 'uploading..!', key, duration: -1 })
            return;
        }
        if (info.file.status === 'done') {
            const src = URL.createObjectURL(info.file.originFileObj)
            console.log(`handleChange setting the source with ${src}`);
            setSrc(src)
            setUploaded(true)
            //? whether to do it auto or not
            getAlignments()
        }
    };
    const getAlignments = () => {
        console.log("getting alignments");
        message.loading({ content: 'recognizing sound words!', key, duration: -1 })
        axios.get(`http://localhost:5000/clips/${clip.id}/recognize`, { headers: { 'x-access-token': utoken } }).then(response => {
            const alignments = { words: reformatAlignments(response.data.text) }
            console.log(alignments)
            setAlignments(alignments)
            setRecognized(true)
            // message.success({ content: 'recognized!', key, duration: 1 })
            message.destroy()
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

            <div style={{ alignContent: "right", textAlign:"right" }}>
                <Space style={{ textAlign: "right" }}>
                    {/* <Button hidden={!uploaded || alignments != undefined} onClick={getAlignments} style={{ float: "right" }} type="default">recognize words</Button> */}
                    <Button hidden={!uploaded} style={{ float: "right" }} type="primary" onClick={saveChanges}>Save Changes</Button>
                </Space>
            </div>
            {alignments && <WaveWords src={src} alignments={alignments} synthesizeText={(oldWord, newWord) => synthesizeText(utoken, clip.id, oldWord, newWord)} />}
        </div>
    );
}

export default NewClipPage;