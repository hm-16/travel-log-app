import axios from "axios";

export async function listLogEntries(email){
    const response = await fetch(`/logs/${email}`);
    return response.json();
}

export async function createLogEntries(entry){
    const response = await fetch(`/logs`,{
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(entry),
    });
    return response.json();
}

export async function deleteEntry(logId){
    const response = await axios.post(`/logs/delete/${logId}`);
    return response.json();
}