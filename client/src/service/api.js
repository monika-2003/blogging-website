import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';
import { getAccessTokens, getType } from '../utils/common';



const API_URL = 'http://localhost:5000';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

axiosInstance.interceptors.request.use(
    function (config) {
        if(config.TYPE.params) {
            config.params = config.TYPE.params;
        }
        else if(config.TYPE.query) {
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    function(response) {
        // stop global loader
        return processResponse(response)
    }, 
    function(error) {
        // stop gloval loader
        return Promise.reject(processError(error))
    }
)


const processResponse = (response)=> {
    if(response?.status === 200) {
        return {
            isSuccess: true,
            data: response.data
        }
    }
    else {
        return {
            isFaliure: true,
            status: response?.status,
            msg: response?.message,
            code: response?.code
        }
    }
}

const processError = (error) => {
    if(error.response) {
        return {
            isFaliure: true,
            msg: API_NOTIFICATION_MESSAGES.responseFaliure,
            code: error.response.status
        }
    } else if(error.request) {
        return {
            isFaliure: true,
            msg: API_NOTIFICATION_MESSAGES.requestFaliure,
            code: ''
        }
    } else {
        return {
            isFaliure: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ''
        }
    }
}


const API = {};

for(const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body) => 
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method == 'DELETE' ? {} : body,
            responseType: value.responseType,
            headers: {
                authorization: getAccessTokens()
            },
            TYPE: getType(value, body),
        })
}

export {API}
