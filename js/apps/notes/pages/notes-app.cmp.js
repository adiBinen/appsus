import noteService from '../services/note.service.js';
import notesHeader from '../cmps/header.cmp.js';
import noteCreate from '../cmps/note-create.cmp.js';
import noteList from '../cmps/note-list.cmp.js';
import {
    eventBus,
    NOTE_DELETE,
    NOTE_DUPLICATE,
    NOTE_MODIFIED,
    NOTE_TODO_ADD,
    NOTE_TODO_REMOVE,
    NOTE_TODO_TOGGLE_MARK,
    NOTE_TODOS_MODIFY,
} from '../../../event-bus.js'

export default {
    props: ['unreadEmails'],
    components: { notesHeader, noteCreate, noteList },
    template: `
        <main class="notes-app " v-if="notes">
            <notes-header :unread-emails="unreadEmails"></notes-header>
            <note-create @note-created="addNote"></note-create>
            <div class="notes-container">
                <!-- <hr v-if ="pinnedNotes.length >= 1"/> -->
                <note-list :notes="pinnedNotes"></note-list>
                <hr v-if ="unpinnedNotes.length >= 1" />
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
        noteService.query()
            .then(notes => this.notes = notes);

        eventBus.$on(NOTE_DELETE, noteId => {
            noteService.deleteNote(noteId);
        })

        eventBus.$on(NOTE_DUPLICATE, noteId => {
            noteService.duplicateNote(noteId);
        })

        eventBus.$on(NOTE_MODIFIED, newNote => {
            // Filter empty todos
            if (Array.isArray(newNote.data)) newNote.data = newNote.data.filter(todo => {
                return todo.txt.length > 0;
            });
            noteService.modifyNote(newNote)
                .then(note => console.log('HI I AM HERE', note));
            // Change note in current instance
        })

        eventBus.$on(NOTE_TODO_ADD, todoToNote => {
            let note = this.notes.find(note => note.id === todoToNote.id);
            note.data.push(todoToNote.pointer);
            noteService.modifyNote(note)
                .then(this.requestNewNotes);
        })

        eventBus.$on(NOTE_TODO_REMOVE, todosToNote => {
            let note = this.notes.find(note => note.id === todosToNote.id);
            note.data = todosToNote.pointer;
            noteService.modifyNote(note)
                .then(this.requestNewNotes);
        })

        eventBus.$on(NOTE_TODO_TOGGLE_MARK, ({ noteId, todoId }) => {
            let note = this.notes.find(note => note.id === noteId);
            let todo = note.data.find(todo => todo.id === todoId);
            todo.isMarked = !todo.isMarked
            noteService.modifyNote(note)
                .then(this.requestNewNotes);
        })

        eventBus.$on(NOTE_TODOS_MODIFY, ({ noteId, todos }) => {
            let note = this.notes.find(note => note.id === noteId);
            note.data = todos;
            noteService.modifyNote(note)
                .then(this.requestNewNotes);
        })


    }
}