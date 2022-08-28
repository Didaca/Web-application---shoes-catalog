import * as api from './api.js';

export const login = api.login;
export const logout = api.logout;
export const register = api.register;

export async function getAllShoes() {
    return api.get('/data/shoes?sortBy=_createdOn%20desc');
}

export async function createShoes(shoes) {
    return api.post('/data/shoes', shoes);
}

export async function getDetails(id) {
    return api.get('/data/shoes/' + id);
}

export async function editShoes(id, shoes) {
    return api.put('/data/shoes/' + id, shoes);
}

export async function deleteShoes(id) {
    return api.del('/data/shoes/' + id);
}

export async function searchShoes(query) {
    return api.get('/data/shoes?where=' + encodeURIComponent(`brand LIKE "${query}"`));
}