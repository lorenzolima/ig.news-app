// This file is to export an axios api for any other files
import axios from 'axios'

export const api = axios.create({
    baseURL: '/api'
})