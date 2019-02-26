export default {
    saveToLocal, loadFromLocal, saveToSession, loadFromSession
}

function saveToLocal(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function loadFromLocal(key) {
    return JSON.parse(localStorage.getItem(key));
}

function saveToSession(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
}

function loadFromSession(key) {
    return JSON.parse(sessionStorage.getItem(key));
}