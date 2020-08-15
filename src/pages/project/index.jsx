import React, { useEffect, useState } from 'react';
import {
    useParams
} from "react-router-dom";
import { getClips, deleteClip, editClip, addClip } from 'api'
import ClipsTable from 'components/clips-table';
import { message, Breadcrumb } from 'antd';

const ProjectPage = () => {

    let { id } = useParams();

    const [clips, setClips] = useState([])
    const [isLoading, setLoading] = useState(false)

    const utoken = sessionStorage.getItem("token")

    const mkey = "loadMessageKey"

    useEffect(() => {

        const fetch = async () => {
            const clips = await getClips(utoken, id)
            setClips(clips)
        }
        message.loading({ content: "getting clips...", key: mkey })
        fetch()
        message.success({ content: 'done!', key: mkey, duration: 1 })
    }, [])

    const onDelete = async (id) => {
        setLoading(true)
        message.loading({ content: "Deleting...", key: mkey })

        const deleted = await deleteClip(utoken, id)
        setClips(clips.filter(p => p.id !== id))

        message.success({ content: 'Deleted!', key: mkey, duration: 2 })
        setLoading(false)
    }

    const onEdit = async (id, newTitle, newDesc) => {
        setLoading(true)
        message.loading({ content: "editing...", key: mkey })

        const editedClip = await editClip(utoken, id, newTitle, newDesc)
        const index = clips.findIndex(p => p.id === id)
        clips.splice(index, 1, editedClip)
        setClips(clips)

        message.success({ content: 'edited!', key: mkey, duration: 2 })
        setLoading(false)
    }

    const onAdd = async (title, desc) => {
        setLoading(true)
        message.loading({ content: "adding...", key: mkey })

        const newClip = await addClip(utoken, id, title, desc)
        setClips([...clips, newClip])

        message.success({ content: 'added!', key: mkey, duration: 2 })
        setLoading(false)
    }

    return (
        <div>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item key="home">Home</Breadcrumb.Item>
                <Breadcrumb.Item key="clips">My Projects</Breadcrumb.Item>
                <Breadcrumb.Item key="clips">{id}</Breadcrumb.Item>
            </Breadcrumb>
            <ClipsTable disableEdit={isLoading} clips={clips} onEdit={onEdit} onDelete={onDelete} onAdd={onAdd} />
        </div>
    );
}

export default ProjectPage;