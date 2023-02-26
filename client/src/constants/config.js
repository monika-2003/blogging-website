export const API_NOTIFICATION_MESSAGES = {
    loading: {
        title: 'Loading....',
        msg: 'Data is being loaded'
    },

    success: {
        title: 'Success :)',
        msg: 'Data is successfully fetched'
    },

    responseFaliure: {
        title: 'Error :(',
        msg: 'Error occured while fething data from backend'
    },

    requestFaliure : {
        title : 'Error :(',
        msg: 'Error occurred while parsing the request data'
    },

    networkError: {
        title: 'Error :(',
        msg: 'Unable to connect with server'
    }
}


export const SERVICE_URLS = {
    userSignup: {
        url: '/signup', method: 'POST'
    },
    userLogin: {
        url: '/login', method: 'POST'
    },
    uploadImage: {
        url: '/upload-image', method: 'POST'
    },
    uploadPost: {
        url: '/upload-post', method: 'POST'
    },
    getAllPost: {
        url: '/posts', method: 'GET', params: true
    },
    getSelectedBlog: {
        url: '/get-post', method: 'GET', query: true
    },
    updatePost: {
        url: '/update-post', method: 'PUT', query: true
    },
    deletePost: {
        url: '/delete-post', method: 'DELETE', query: true
    }
}