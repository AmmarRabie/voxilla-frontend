import React, { useState } from 'react';
import { Button, Space, Table, Popconfirm, Modal, Input } from 'antd';
import { Link } from 'react-router-dom'

const ClipsTable = ({ clips, onDelete, onEdit, onAdd, disableEdit, onDownloadAudio, onDownloadTranscript }) => {
    const ClipsWithKey = clips.map(c => ({ ...c, key: c.id }))

    const [modalVisibility, setModalVisibility] = useState(false)
    const [selectedId, setSelectedId] = useState(null)
    const [title, setTitle] = useState(null)
    const [desc, setDesc] = useState(null)

    const handleEdit = (id, title, desc) => {
        setSelectedId(id)
        setTitle(title)
        setDesc(desc)
        setModalVisibility(true)
    }

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => <Link to={{ pathname: `/clips/${record.id}`, clip: record }}>{text}</Link>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'creation Date',
            dataIndex: 'creationDate',
            key: 'creationDate',
        },
        {
            title: 'Actions',
            key: 'action',
            render: (text, record) => (
                <Space size="small" direction="vertical">
                    <Space size="middle">
                        <Button type="link" disabled={disableEdit} onClick={() => handleEdit(record.id, record.title, record.description)}>Edit</Button>
                        <Popconfirm
                            title="Are you sure to delete this clip?"
                            onConfirm={() => onDelete(record.id)}
                            okText="Delete"
                            cancelText="Cancel"
                            disabled={disableEdit}
                        >
                            <a>Delete</a>
                        </Popconfirm>
                    </Space>
                    <Space size="middle">
                        <Button type="link" onClick={() => onDownloadAudio(record.id)}>download audio</Button>
                        <Button type="link" onClick={() => onDownloadTranscript(record.id)}>download transcript</Button>
                    </Space>
                </Space>
            ),
        },
    ];

    const isValidInputs = () => title && title.trim() !== ""
    return <>
        <Button type="primary" disabled={disableEdit} onClick={() => handleEdit(null, "", "")}>Add Clip</Button>
        <Table columns={columns} dataSource={ClipsWithKey} />
        <Modal
            title="Clip information"
            visible={modalVisibility}
            onOk={() => { setModalVisibility(false); selectedId === null ? onAdd(title, desc) : onEdit(selectedId, title, desc) }}
            onCancel={() => setModalVisibility(false)}
            okText={selectedId === null ? "continue" : "ok"}
            okButtonProps={{ disabled: !isValidInputs() }}
        >
            <Space>
                <Input placeholder="new title" value={title} onChange={e => setTitle(e.target.value)} />
                <Input placeholder="new description" value={desc} onChange={e => setDesc(e.target.value)} />
            </Space>
        </Modal>
    </>
}

export default ClipsTable;