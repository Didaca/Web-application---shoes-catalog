export function getUserData() {
    return JSON.parse(sessionStorage.getItem('userInfo'));
}

export function setUserData(data) {
    return sessionStorage.setItem('userInfo', JSON.stringify(data));
}

export function delUserData() {
    sessionStorage.removeItem('userInfo');
}