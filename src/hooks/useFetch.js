import { SERVER_DIR } from '../const/ServerUrl'
import { useAuthToken } from './useAuthToken'

export function useFetch({ route = '', authtoken = '' }) {

    const [token] = useAuthToken()

    const _URL = `${SERVER_DIR}/api/${route}`

    const fetching = async (url = '', method = 'GET' || 'POST' || 'PUT' || 'DELETE', body = {}, authTkn = '') => {
        const headers = {
            'Content-Type': 'application/json'
        }
        // console.log(token)
        if (token && token !== '' && authtoken === '') {
            headers['Authorization'] = `Bearer ${token}`
        }
        if (authtoken && authtoken !== '' && authTkn !== '') {
            headers['Authorization'] = `Bearer ${authtoken}`
        }
        if (authTkn && authTkn !== '') {
            headers['Authorization'] = `Bearer ${authTkn}`
        }
        const options = {
            method: method,
            headers: headers,
        }
        if (method !== 'GET' && method !== 'DELETE') {
            options['body'] = JSON.stringify(body)
        }
        const response = await fetch(url, options)
        const status = parseInt(response.status)
        if (!(status === 200 || status === 201)) {
            console.error((await response.json()));
            throw new Error(`Error status code: ${response.status}`)
        }
        return (await response.json())
    }

    const get = async (id = '', auth = '') => {
        const url = (id && id !== '') ? `${_URL}/${id}` : _URL
        const response = await fetching(url, 'GET', {}, auth);
        return response
    }

    const post = async (body, auth = '') => {
        // console.log(body)
        // return body
        const response = await fetching(_URL, 'POST', body, auth)
        return response
    }

    const put = async (body, auth = '') => {
        // console.log(body)
        // return body
        const response = await fetching(`${_URL}/${body.id}`, 'PUT', body, auth);
        return response
    }

    const del = async (id, auth = '') => {
        // console.log(id)
        // return id
        const response = await fetch(`${_URL}/${id}`, 'DELETE', {}, auth)
        return response
    }

    return { get, post, put, del }
}
