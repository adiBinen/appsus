// GLOBAL CMPS
import userMsg from '../../../cmps/user-msg-global.cmp.js';

// NOTE RELATED COMPONENTS
import noteService from '../services/note.service.js';
import notesHeader from '../cmps/header.cmp.js';
import noteCreate from '../cmps/note-create.cmp.js';
import noteList from '../cmps/note-list.cmp.js';

// EVENT BUS
import {
    eventBus,
    NOTE_DELETE,
    NOTE_DUPLICATE,
    NOTE_MODIFIED,
    NOTE_TODOS_MODIFY,
    NOTE_UPDATE,
    USER_MSG_SUCCESS,
} from '../../../event-bus.js'

export default {
    props: ['unreadEmails'],
    components: { notesHeader, noteCreate, noteList, userMsg },
    template: `
        <main class="notes-app " v-if="notes">
            <notes-header :unread-emails="unreadEmails"></notes-header>
            <note-create @note-created="addNote"></note-create>
            <div class="notes-container">
                <!-- <hr v-if ="pinnedNotes.length >= 1"/> -->
                <h3 v-if ="pinnedNotes.length >= 1" class="notes-sections">Pinned Notes</h3>
                <note-list :notes="pinnedNotes"></note-list>
                <!-- <hr v-if ="unpinnedNotes.length >= 1" /> -->
                <h3 v-if ="pinnedNotes.length >= 1" class="notes-sections">Other Notes</h3>
                <note-list :notes="unpinnedNotes"></note-list>
            </div>
            <user-msg></user-msg>
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
                .then(msg => {eventBus.$emit(USER_MSG_SUCCESS, msg)});
        },
        requestNewNotes() {
            noteService.query()
                .then(notes => this.notes = notes);
        }
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
        // Get notes from server
        noteService.query()
            .then(notes => this.notes = notes);

        // EVENT LISTENERS
        eventBus.$on(NOTE_DELETE, noteId => {
            noteService.deleteNote(noteId)
                .then(msg => {eventBus.$emit(USER_MSG_SUCCESS, msg)});
        });

        eventBus.$on(NOTE_UPDATE, ({id, data}) => {
            let note = this.notes.find(note => note.id === id);
            note.data = data;
            noteService.modifyNote(note)
                .then(this.requestNewNotes);
        });

        eventBus.$on(NOTE_DUPLICATE, noteId => {
            noteService.duplicateNote(noteId)
                .then(msg => {eventBus.$emit(USER_MSG_SUCCESS, msg)});
            
        });

        eventBus.$on(NOTE_MODIFIED, newNote => {
            // Filter empty todos
            if (Array.isArray(newNote.data)) newNote.data = newNote.data.filter(todo => {
                return todo.txt.length > 0;
            });
            noteService.modifyNote(newNote)
                .then(msg => {eventBus.$emit(USER_MSG_SUCCESS, msg)});
        });

        eventBus.$on(NOTE_TODOS_MODIFY, ({ noteId, todos }) => {
            let note = this.notes.find(note => note.id === noteId);
            note.data = todos;
            noteService.modifyNote(note)
                .then(this.requestNewNotes);
        });


        // See if URL contains a premade note (from a sibling app - /notes?content=XXXX)
        let { content } = this.$route.query;
        if (content) {
            let externalNote = {
                type: 'typeNote',
                data: content,
            };
            this.addNote(externalNote);
        }

    }
}