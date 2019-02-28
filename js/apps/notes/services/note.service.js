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
        console.log('service',data);
        let txts = data.split(',');
        let todo = txts.map(txt => {
            return {
                id: utilService.generateId(),
                txt: txt,
                isMarked: false,
            };
        })
        data = todo;
        console.log(todo, data);
    }

    notesDB.unshift(_createNote(type, data));
    storageService.saveToLocal(NOTES_KEY, notesDB);
    return Promise.resolve(`Note was successfully created.`);
}

function deleteNote(id) {
    let idx = notesDB.findIndex(note => note.id === id);
    if (idx === -1) return Promise.reject('Failed to delete e-mail.')
    notesDB.splice(idx, 1);
    storageService.saveToLocal(NOTES_KEY, notesDB);
    return Promise.resolve('Note was successfully deleted.');
}

function duplicateNote(noteId) {
    getNoteById(noteId)
        .then((note) => {
            let idx = notesDB.findIndex(note => note.id === noteId);
            let copyNote = { ...note };
            copyNote.id = utilService.generateId();
            notesDB.splice(idx, 0, copyNote);
            storageService.saveToLocal(NOTES_KEY, notesDB);
            return Promise.resolve();
        })
}


function modifyNote(modifiedNote) {
    let idx = _getNoteIdxById(modifiedNote.id);
    if (idx !== -1) {
        notesDB.splice(idx, 1, modifiedNote);
        storageService.saveToLocal(NOTES_KEY, notesDB);
        return Promise.resolve('Note was successfully modified');
    }
    return Promise.reject('Note not found');
}

function _getNoteIdxById(id) {
    return notesDB.findIndex(note => note.id === id);
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
            { id: utilService.generateId(), txt: 'Go walk', isMarked: false },
            { id: utilService.generateId(), txt: 'Go swim', isMarked: false },
            { id: utilService.generateId(), txt: 'Go jump', isMarked: true },
        ]);
        let img = _createNote('typeImage', './img/my-meme.jpg');
        notes.push(video, audio, img, note, todo);
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