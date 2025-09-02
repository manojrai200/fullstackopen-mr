import axios from "axios";
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = person => {
    return axios.post(baseUrl, person)
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, person) => {
    return axios.put(`${baseUrl}/${id}`, person)
}

export default { getAll, create, remove, update }