import noteService from '../services/note.service.js';
import notesHeader from '../cmps/header.cmp.js';
import noteCreate from '../cmps/note-create.cmp.js';
import noteList from '../cmps/note-list.cmp.js';
import { eventBus, 
        NOTE_DELETE, 
        NOTE_DUPLICATE, 
        NOTE_MODIFIED,
        PALETTE_OPENED,
        PALETTE_CLOSED
    } from '../../../event-bus.js'

export default {
    components: { notesHeader, noteCreate, noteList },
    template: `
        <main class="notes-app " v-if="notes">
            <notes-header></notes-header>
            <note-create @note-created="addNote"></note-create>
            <div class="notes-container">
                <h3>pinnedNotes</h3>
                <note-list :notes="pinnedNotes"></note-list>
                <h3>unpinnedNotes</h3>
                <note-list :notes="unpinnedNotes"></note-list>
            </div>
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
        },
    },
    computed: {
        pinnedNotes() {
            return this.notes.filter((note) => note.isPinned)
        },
        unpinnedNotes() {
            return this.notes.filter((note) => !note.isPinned)
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

        eventBus.$on(NOTE_MODIFIED, newNote => {            
            noteService.modifyNote(newNote);
        })

        eventBus.$on(PALETTE_OPENED, isPaletteOpen => {

        })

    }
}