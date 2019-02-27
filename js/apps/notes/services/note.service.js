import utilService from '../../../services/util.service.js';
import storageService from '../../../services/storage.service.js';

export default {
    query,
    getNoteById,
    addNote,
    deleteNote,
    duplicateNote,
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
    else return Promise.reject('Error: Note not found');
}

function addNote(type, data) {
    notesDB.push(_createNote(type, data));
    storageService.saveToLocal(NOTES_KEY, notesDB);
    return Promise.resolve(`E-Mail was successfully sent to ${recipient}.`);
}

function deleteNote(id) {
    let idx = notesDB.findIndex(note => note.id === id);
    if (idx === -1) return Promise.reject('Failed to delete e-mail.')
    notesDB.splice(idx, 1);
    storageService.saveToLocal(NOTES_KEY, notesDB);
    return Promise.resolve('E-Mail was successfully deleted.');
}

function duplicateNote(noteId) {
    getNoteById(noteId)
        .then((note) => {
            let idx = notesDB.findIndex(note => note.id === noteId);
            let copyNote = { ...note };
            copyNote.id = utilService.generateId();
            notesDB.splice(idx, 0, copyNote);
            return Promise.resolve();
        })
}

function _createNotes() {
    let notes = storageService.loadFromLocal(NOTES_KEY);
    if (!notes) {
        notes = [];
        // Dummy Data
        let video = _createNote('typeVideo', 'https://www.youtube.com/embed/tgbNymZ7vqY');
        let audio = _createNote('typeAudio', './sound/win.mp3');
        let note = _createNote('typeNote', 'Hi there I am a note');
        let todo = _createNote('typeTodo', [
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

        id: utilService.generateId(),
        type: type,
        data: data,
        createdAt: Date.now(),
    }
}