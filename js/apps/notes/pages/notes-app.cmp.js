// GLOBAL CMPS
import userMsg from '../../../cmps/user-msg-global.cmp.js';
import confirmBox from '../../../cmps/confirm.cmp.js';

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
    USER_MSG_FAILURE,
    NOTES_CLEAR_SEARCH,
    TO_CONFIRM,
    NOTE_DELETE_ANS
} from '../../../event-bus.js'

export default {
    props: ['unreadEmails'],
    components: { notesHeader, noteCreate, noteList, userMsg, confirmBox },
    template: `
        <main class="notes-app " v-if="notes">
            <notes-header :unread-emails="unreadEmails" :notes="notes"></notes-header>
            <note-create @note-created="addNote"></note-create>
            <div class="notes-container">
                <note-list v-if="searchTerm" :notes="searchedNotes"></note-list>
                <h3 v-if ="!searchTerm && pinnedNotes.length >= 1" class="notes-sections">Pinned</h3>
                <note-list v-if="!searchTerm" :notes="pinnedNotes"></note-list>
                <h3 v-if ="!searchTerm && pinnedNotes.length >= 1" class="notes-sections">Others</h3>
                <note-list v-if="!searchTerm" :notes="unpinnedNotes"></note-list>
            </div>
            <user-msg></user-msg>
            <confirm-box></confirm-box>
        </main>
    `,
    data() {
        return {
            notes: null,
            searchTerm: null,
        };
    },
    methods: {
        addNote(note) {
            noteService.addNote(note.type, note.data)
                .then(msg => { eventBus.$emit(USER_MSG_SUCCESS, msg) });
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
        },
        searchedNotes() {
            let term = this.searchTerm.toLowerCase();
            return this.notes.filter(note => {
                if (note.type === 'typeTodo') {
                    if (note.data.some(todo => (todo.txt.toLowerCase().includes(term)))) return true;
                } else {
                    return note.data.toLowerCase().includes(term);
                }
            })
        }
    },
    watch: {
        $route(to, from) {
            this.searchTerm = to.hash.replace(/#search\//, '').toLowerCase();
        }
    },
    created() {
        // Get notes from server
        noteService.query()
            .then(notes => {
                this.notes = notes;
            });

        // EVENT LISTENERS
        eventBus.$on(NOTE_DELETE, noteId => {
            eventBus.$emit(TO_CONFIRM, 
                { msg: 'Are you sure you wish to delete this note?', 
                type: 'note-confirmation',
                id: noteId,
            });
        });

        eventBus.$on(NOTE_DELETE_ANS, userRes => {
            userRes.then(id =>
                noteService.deleteNote(id)
                    .then(msg => { eventBus.$emit(USER_MSG_SUCCESS, msg) })
            ).catch(msg => { eventBus.$emit(USER_MSG_FAILURE, msg) });
        })

        eventBus.$on(NOTE_UPDATE, ({ id, data }) => {
            let note = this.notes.find(note => note.id === id);
            note.data = data;
            noteService.modifyNote(note)
                .then(this.requestNewNotes);
        });

        eventBus.$on(NOTE_DUPLICATE, noteId => {
            noteService.duplicateNote(noteId)
                .then(msg => { eventBus.$emit(USER_MSG_SUCCESS, msg) });

        });

        eventBus.$on(NOTE_MODIFIED, newNote => {
            // Filter empty todos
            if (Array.isArray(newNote.data)) newNote.data = newNote.data.filter(todo => {
                return todo.txt.length > 0;
            });
            noteService.modifyNote(newNote)
                .then(msg => { eventBus.$emit(USER_MSG_SUCCESS, msg) });
        });

        eventBus.$on(NOTE_TODOS_MODIFY, ({ noteId, todos }) => {
            let note = this.notes.find(note => note.id === noteId);
            note.data = todos;
            noteService.modifyNote(note)
                .then(this.requestNewNotes);
        });

        eventBus.$on(NOTES_CLEAR_SEARCH, () => {
            this.searchTerm = null;
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

    },
    beforeDestroy() {
        eventBus.$off(NOTE_DELETE);

        eventBus.$off(NOTE_DELETE_ANS)

        eventBus.$off(NOTE_UPDATE);

        eventBus.$off(NOTE_DUPLICATE);

        eventBus.$off(NOTE_MODIFIED);

        eventBus.$off(NOTE_TODOS_MODIFY);

        eventBus.$off(NOTES_CLEAR_SEARCH);

    }
}