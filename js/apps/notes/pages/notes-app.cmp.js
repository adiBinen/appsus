import noteService from '../services/note.service.js';
import notesHeader from '../cmps/header.cmp.js';
import noteCreate from '../cmps/note-create.cmp.js';
import noteList from '../cmps/note-list.cmp.js';

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
            console.log('Hi', note)
            noteService.addNote(note.type, note.data)
                .then(res => console.log(res));
        }
    },
    created() {
        noteService.query()
            .then(notes => this.notes = notes);
    },
}