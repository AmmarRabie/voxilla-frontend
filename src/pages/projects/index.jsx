import { Breadcrumb, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { getProjects, editProject, addProject, deleteProject } from "api";
import ProjectsTable from 'components/projects-table';
const ProjectsPage = () => {

    const [projects, setProjects] = useState([])
    const [isLoading, setLoading] = useState(false)

    const utoken = sessionStorage.getItem("token")

    const mkey = "loadMessageKey"

    useEffect(() => {

        const fetch = async () => {
            const projects = await getProjects(utoken)
            setProjects(projects)
        }
        message.loading({ content: "getting projects...", key: mkey })
        fetch()
        message.success({ content: 'done!', key: mkey, duration: 1 })
    }, [])

    const onDelete = async (id) => {
        setLoading(true)
        message.loading({ content: "Deleting...", key: mkey })

        const deleted = await deleteProject(utoken, id)
        setProjects(projects.filter(p => p.id !== id))

        message.success({ content: 'Deleted!', key: mkey, duration: 2 })
        setLoading(false)
    }

    const onEdit = async (id, newTitle, newDesc) => {
        setLoading(true)
        message.loading({ content: "editing...", key: mkey })

        const editedProject = await editProject(utoken, id, newTitle, newDesc)
        const index = projects.findIndex(p => p.id === id)
        projects.splice(index, 1, editedProject)
        setProjects(projects)

        message.success({ content: 'edited!', key: mkey, duration: 2 })
        setLoading(false)
    }

    const onAdd = async (title, desc) => {
        setLoading(true)
        message.loading({ content: "adding...", key: mkey })

        const project = await addProject(utoken, title, desc)
        setProjects([...projects, project])

        message.success({ content: 'added!', key: mkey, duration: 2 })
        setLoading(false)
    }

    return (
        <div>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item key="home">Home</Breadcrumb.Item>
                <Breadcrumb.Item key="clips">My Projects</Breadcrumb.Item>
            </Breadcrumb>
            <ProjectsTable disableEdit={isLoading} projects={projects} onEdit={onEdit} onDelete={onDelete} onAdd={onAdd} />
        </div>
    );
}

export default ProjectsPage;