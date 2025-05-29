import axios from 'axios'
import config from '../../app.config'
  
export const useAxios = () => {
    const instance = axios.create({
        baseURL: config.apiBase
    })

    return instance
}