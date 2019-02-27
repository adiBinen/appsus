import utilService from '../../../services/util.service.js';
import storageService from '../../../services/storage.service.js';

export default {
    query,
    getNoteById,
    addNote,
    deleteNote,
};

const NOTES_KEY = 'localNotes';


var notesDB;

_createNotes();

function query() {
    return Promise.resolve(notesDB);
}

function getNoteById(id) {
    let note = notesDB.find(note => note.id === id);
    if (note) return Promise.resolve(note);
    else return Promise.reject('Error: Email not found');
}

function addNote(type, data) {
    notesDB.push(_createNote(type, data));
    storageService.saveToLocal(NOTES_KEY, notesDB);
    return Promise.resolve(`E-Mail was successfully sent to ${recipient}.`);
}

function deleteNote(id) {
    let idx = notesDB.findIndex(email => email.id === id);
    if (idx === -1) return Promise.reject('Failed to delete e-mail.')
    notesDB.splice(idx, 1);
    storageService.saveToLocal(NOTES_KEY, notesDB);
    return Promise.resolve('E-Mail was successfully deleted.');
}

function _createNotes() {
    let notes = storageService.loadFromLocal(NOTES_KEY);
    if (!notes) {
        notes = [];
        // Dummy Data
        let video = _createNote('video', 'https://www.youtube.com/watch?v=JVZTP_kX5BE');
        let audio = _createNote('audio', './sound/win.mp3');
        let note = _createNote('note', 'Hi there I am a note');
        let todo = _createNote('todo', [
            { txt: 'Go walk', isMarked: false },
            { txt: 'Go swim', isMarked: false },
            { txt: 'Go jump', isMarked: false },
        ]);
        notes.push(video, audio, note, todo);
        storageService.saveToLocal(NOTES_KEY, notes);
    }
    notesDB = notes;
}

function _createNote(type, data) {
    return {
        // type: 'video' || 'audio' || 'todo' || 'note',
        // data: 'src'   || 'src'   || '[]'   || 'txt',

        type: type,
        data: data,
    }
}