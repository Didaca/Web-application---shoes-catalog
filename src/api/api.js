import {delUserData, getUserData, setUserData} from '../../util.js';

const host = 'http://localhost:3030';

async function request(url, options) {
    try {
        const response = await fetch(host + url, options);

        if(response.ok != true) {
            if(response.status == 403) {
                sessionStorage.clear();
            }

            const err = await response.json();
            throw new Error(err.message);
        }

        if(response.status == 204) {
            return response;
        } else {
            return response.json();
        }
        
    } catch (error) {
        alert(error.message);
        throw error;
    }
}

function createOptions(method='get', data) {
    let option = {
        method,
        headers: {}
    }

    if(data != undefined) {
        option.headers['Content-Type'] = 'application/json';
        option.body = JSON.stringify(data);
    }

    let userData = getUserData();

    if(userData != null) {
        option.headers['X-Authorization'] = userData.token;
    }

    return option;
}


export async function get(url) {
    return await request(url, createOptions());
}

export async function post(url, data) {
    return await request(url, createOptions('post', data));
}

export async function put(url, data) {
    return await request(url, createOptions('put', data));
}

export async function del(url) {
    await request(url, createOptions('delete'));
}

export async function login(email, password) {
    let resp = await post('/users/login', {email, password});

    let userData = {
        email: resp.email,
        id: resp._id,
        token: resp.accessToken
    }

    setUserData(userData);

    return resp;
}

export async function logout() {
    get('/users/logout');
    delUserData();
}

export async function register(email, password) {
    let res = await post('/users/register', {email, password});

    let userData = {
        email: res.email,
        id: res._id,
        token: res.accessToken
    }

    setUserData(userData);

    return res;
}