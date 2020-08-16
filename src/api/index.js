import axios from 'axios';

export async function login(username, password) {
    console.log(username, password)
    const encodedAuth = btoa(username + ":" + password)
    // try {
    const response = await axios.get("http://localhost:5000/login", { headers: { 'Authorization': `Basic ${encodedAuth}` } })
    return response.data

    // } catch (error) {
    //     console.log("errrorr", error.message)
    //     throw error
    // }
}

export async function signup(username, email, password) {
    console.log(username, email, password)
    const body = {
        username, email, password
    }
    // try {
    const response = await axios.post("http://localhost:5000/signup", body)
    return response.data
    // } catch (error) {
    //     console.log("errrorr", error.message)
    //     return error.data
    // }
}


export async function getProjects(token) {
    const response = await axios.get("http://localhost:5000/projects", { headers: { 'x-access-token': token } })
    return response.data.projects
}

export async function addProject(token, title, desc) {
    const response = await axios.post(`http://localhost:5000/projects`, { title, desc }, { headers: { 'x-access-token': token } })
    return response.data.project
}

export async function deleteProject(token, projId) {
    const response = await axios.delete(`http://localhost:5000/projects/${projId}`, { headers: { 'x-access-token': token } })
    return response.data.project
}

export async function editProject(token, projId, title, desc) {
    const response = await axios.put(`http://localhost:5000/projects/${projId}`, { title, desc }, { headers: { 'x-access-token': token } })
    return response.data.project
}

///////////////////////////////////



export async function getClips(token, projId) {
    const response = await axios.get(`http://localhost:5000/${projId}/clips`, { headers: { 'x-access-token': token } })
    return response.data.clips
}

export async function addClip(token, projId, title, desc) {
    const response = await axios.post(`http://localhost:5000/${projId}/clips`, { title, desc }, { headers: { 'x-access-token': token } })
    return response.data.clip
}

export async function deleteClip(token, clipId) {
    const response = await axios.delete(`http://localhost:5000/clips/${clipId}`, { headers: { 'x-access-token': token } })
    return response.data.clip
}

export async function editClip(token, clipId, title, desc) {
    const response = await axios.put(`http://localhost:5000/clips/${clipId}`, { title, desc }, { headers: { 'x-access-token': token } })
    return response.data.clip
}

export async function downloadClipAudio(token, clipId) {
    const response = await axios.get(`http://localhost:5000/clips/${clipId}?type=audio`, { headers: { 'x-access-token': token } })

}

export async function downloadClipTranscript(token, clipId) {
    const response = await axios.get(`http://localhost:5000/clips/${clipId}?type=transcript`, { headers: { 'x-access-token': token } })
}