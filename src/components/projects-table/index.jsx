import React, { useState } from 'react';
import { Button, Space, Table, Popconfirm, Modal, Input } from 'antd';
import { Link } from 'react-router-dom'

const ProjectsTable = ({ projects, onDelete, onEdit, onAdd, disableEdit }) => {
    const projectsWithKey = projects.map(p => ({ ...p, key: p.id }))

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
            render: (text, record) => <Link to={`/projects/${record.id}`}>{text}</Link>,
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
                <Space size="middle">
                    <Button type="link" disabled={disableEdit} onClick={() => handleEdit(record.id, record.title, record.description)}>Edit</Button>
                    <Popconfirm
                        title="Are you sure delete this project?"
                        onConfirm={() => onDelete(record.id)}
                        okText="Delete"
                        cancelText="Cancel"
                        disabled={disableEdit}
                    >
                        <a href="#">Delete</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const isValidInputs = () => title && title.trim() !== ""
    return <>
        <Button type="primary" disabled={disableEdit} onClick={() => handleEdit(null, "", "")}>Add Project</Button>
        <Table columns={columns} dataSource={projectsWithKey} />
        <Modal
            title="project information"
            visible={modalVisibility}
            onOk={() => { setModalVisibility(false); selectedId === null ? onAdd(title, desc) : onEdit(selectedId, title, desc) }}
            onCancel={() => setModalVisibility(false)}
            okButtonProps={{ disabled: !isValidInputs() }}
        >
            <Space>
                <Input placeholder="new title" value={title} onChange={e => setTitle(e.target.value)} />
                <Input placeholder="new description" value={desc} onChange={e => setDesc(e.target.value)} />
            </Space>
        </Modal>
    </>
}

export default ProjectsTable;