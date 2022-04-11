import { useEffect, useState } from 'react'
import { SERVER_DIR } from '../const/ServerUrl';



export default function useFormFetch({ route = '', fetchSettings = true }) {

    const [rows, setRows] = useState([]);

    const [settings, setSettings] = useState({})

    useEffect(() => {
        if (fetchSettings) {
            getSettings()
                .then(data => {
                    setSettings(data)
                })
        }
        return () => {
            setRows([])
            setSettings({})
        }
    }, [])

    const _URL = `${SERVER_DIR}/api/${route}`

    const onSetRows = (models = [{}]) => {
        setRows(models)
    }

    const getAll = async () => {
        const response = await fetch(_URL);
        if (response.status !== 200 && response.status !== '200') {
            console.error((await response.json()));
            throw new Error(`Error status code: ${response.status}`)
        }
        // console.log(await response.json())
        return (await response.json())
    }

    const get = async (id) => {
        const response = await fetch(`${_URL}/${id}`);
        if (response.status !== 200 && response.status !== '200') {
            console.error((await response.json()));
            throw new Error(`Error status code: ${response.status}`)
        }
        return (await response.json())
    }

    const post = async (body) => {
        // console.log(body)
        // return body
        const response = await fetch(_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        if (response.status !== 200 && response.status !== '200') {
            console.error((await response.json()));
            throw new Error(`Error status code: ${response.status}`)
        }
        return (await response.json())
    }

    const put = async (body) => {
        // console.log(body)
        // return body
        const response = await fetch(`${_URL}/${body.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        if (response.status !== 200 && response.status !== '200') {
            console.error((await response.json()));
            throw new Error(`Error status code: ${response.status}`)
        }
        return (await response.json())
    }
    const deleteRow = async (id) => {
        // console.log(id)
        // return id
        const response = await fetch(`${_URL}/${id}`, {
            method: 'DELETE',
        })
        if (response.status !== 200 && response.status !== '200') {
            console.error((await response.json()));
            throw new Error(`Error status code: ${response.status}`)
        }
        return (await response.json())
    }

    const getSettings = async () => {
        const response = await fetch(`${_URL}/settings`, {
            method: 'GET',
        })
        if (response.status !== 200 && response.status !== '200') {
            console.error((await response.json()));
            throw new Error(`Error status code: ${response.status}`)
        }
        return (await response.json())
    }

    return { getAll, get, post, put, deleteRow, getSettings, onSetRows, rows, settings }
}
