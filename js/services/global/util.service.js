export default {
    generateId, getRandomIntInclusive
}

function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }