import utilService from '../../../services/util.service.js';
import storageService from '../../../services/storage.service.js';

export default {
    query,
    getNoteById,
    addNote,
    deleteNote,
    duplicateNote,
    modifyNote,
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
    // Data is a string and if the type is a todo, create an appropriate object
    if (type === 'typeTodo') {
       data.forEach(todo => todo.isMarked = false);
    }

    notesDB.unshift(_createNote(type, data));
    storageService.saveToLocal(NOTES_KEY, notesDB);
    return Promise.resolve(`Note was successfully created.`);
}

function deleteNote(id) {
    let idx = notesDB.findIndex(note => note.id === id);
    if (idx === -1) return Promise.reject('Failed to delete the note.')
    notesDB.splice(idx, 1);
    storageService.saveToLocal(NOTES_KEY, notesDB);
    return Promise.resolve('Note was successfully deleted.');
}

function duplicateNote(noteId) {
    return getNoteById(noteId)
        .then((note) => {
            let idx = notesDB.findIndex(note => note.id === noteId);
            let copyNote = { ...note };
            copyNote.id = utilService.generateId();
            notesDB.splice(idx, 0, copyNote);
            storageService.saveToLocal(NOTES_KEY, notesDB);
            return Promise.resolve('Note was successfully duplicated.');
        })
}


function modifyNote(modifiedNote) {
    let idx = _getNoteIdxById(modifiedNote.id);
    if (idx !== -1) {
        notesDB.splice(idx, 1, modifiedNote);
        storageService.saveToLocal(NOTES_KEY, notesDB);
        return Promise.resolve('Note was successfully modified');
    }
    return Promise.reject('Error: Note not found');
}

function _getNoteIdxById(id) {
    return notesDB.findIndex(note => note.id === id);
}

function _createNotes() {
    let notes = storageService.loadFromLocal(NOTES_KEY);
    if (!notes) {
        notes = [];
        // Dummy Data
        let video1 = _createNote('typeVideo', 'https://www.youtube.com/embed/tgbNymZ7vqY');
        let video2 = _createNote('typeVideo', 'https://www.youtube.com/watch?v=JVZTP_kX5BE'); // WILL BE TURNED INTO EMBED
        let audio = _createNote('typeAudio', './sound/win.mp3');
        let note = _createNote('typeNote', 'Hi there I am a note');
        let todo1 = _createNote('typeTodo', [
            { id: '-' + utilService.generateId(), txt: 'Code during day', isMarked: true },
            { id: '-' + utilService.generateId(), txt: 'Code during night', isMarked: true },
            { id: '-' + utilService.generateId(), txt: 'jump off a cliff', isMarked: false },
        ]);
        let todo2 = _createNote('typeTodo', [
            { id: '-' + utilService.generateId(), txt: 'Go walk', isMarked: false },
            { id: '-' + utilService.generateId(), txt: 'Go swim', isMarked: false },
            { id: '-' + utilService.generateId(), txt: 'Go run', isMarked: false },
        ]);
        let img = _createNote('typeImage', './img/my-meme.jpg');
        notes.push(video1, audio, img, note, todo1, video2, todo2);
        notes[0].isPinned = true;
        notes[4].isPinned = true;
        storageService.saveToLocal(NOTES_KEY, notes);
    }
    notesDB = notes;
}

function _createNote(type, data) {
    return {
        // type: 'video' || 'audio' || 'image' || 'todo'                  || 'note',
        // data: 'src'   || 'src'   || 'src'   || '[id, txt, isMarked]'   || 'txt',

        id: utilService.generateId(),
        type: type,
        data: data,
        createdAt: Date.now(),
        color: utilService.getRandomPastel(),
        isPinned: false
    }
}