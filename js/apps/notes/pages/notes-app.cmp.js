import noteService from '../services/note.service.js';
import notesHeader from '../cmps/header.cmp.js';
import noteCreate from '../cmps/note-create.cmp.js';
import noteList from '../cmps/note-list.cmp.js';
import {eventBus, NOTE_DELETE, NOTE_DUPLICATE, NOTE_CHANGE_COLOR} from '../../../event-bus.js'

export default {
    components: { notesHeader, noteCreate, noteList },
    template: `
        <main class="notes-app">
            <notes-header></notes-header>
            <note-create @note-created="addNote"></note-create>
            <note-list :notes="notes"></note-list>
        </main>
    `,
    data() {
        return {
            notes: null,
        };
    },
    methods: {
        addNote(note) {
            noteService.addNote(note.type, note.data)
                .then(res => console.log(res));
        }
    },
    created() {
        noteService.query()
            .then(notes => this.notes = notes);

        eventBus.$on(NOTE_DELETE, noteId => {
            noteService.deleteNote(noteId);
        })

        eventBus.$on(NOTE_DUPLICATE, noteId => {
            noteService.duplicateNote(noteId);
        })

        eventBus.$on(NOTE_CHANGE_COLOR, changeObj => {
            let noteId = changeObj.noteId;
            let color = changeObj.color;
            noteService.changeNoteProp('color', color, noteId);
        })
    }
}