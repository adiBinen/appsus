import noteService from '../services/note.service.js';
import notesHeader from '../cmps/header.cmp.js';
import noteList from '../cmps/note-list.cmp.js';
import {eventBus, NOTE_DELETE, NOTE_DUPLICATE} from '../../../event-bus.js'

export default {
    components: { notesHeader, noteList },
    template: `
        <main class="notes-app">
            <notes-header></notes-header>
            <!-- CREATE NOTE -->
            <note-list :notes="notes"></note-list>
        </main>
    `,
    data() {
        return {
            notes: null,
        };
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
    }
}