import axios from 'axios';

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] ='application/json;charset=utf-8;';

class Api {

    constructor() {
        this.base_url = 'http://192.168.1.240:8081/tradenet';
    }

    getBaseUrl() {
       

        return 'http://192.168.1.240:8081/tradenet';
    }
    //
    /**
     * Get
     * @param {string} endpoint
     * @param {*} params
     */
    get(endpoint, params = {}) {
        return new Promise((resolve, reject) => {
            axios({url: `${this.base_url}/${endpoint}`, params, method: 'GET' }).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            });
        });
    }

    /**
     * Post
     * @param {string} endpoint
     * @param {*} data
     */
    post(endpoint, data = {}) {
        return new Promise((resolve, reject) => {
            axios({url: `${this.base_url}/${endpoint}`, data: data, method: 'POST' }).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            });
        });
    }

    /**
     * PUT
     * @param {string} endpoint
     * @param {*} data
     */
    put(endpoint, data = {}) {
        return new Promise((resolve, reject) => {
            axios({url:`${this.base_url}/${endpoint}`, data: data, method: 'PUT'}).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            });
        });
    }

    /**
     * Delete
     * @param {string} endpoint
     * @param {*} params
     */
    delete(endpoint, params = {}) {
        return new Promise((resolve, reject) => {
            axios({url: `${this.base_url}/${endpoint}`, params, method: 'DELETE' }).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            });
        });
    }
}

export default new Api;