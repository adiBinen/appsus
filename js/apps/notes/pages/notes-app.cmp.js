import noteService from '../services/note.service.js';
import notesHeader from '../cmps/header.cmp.js';

export default {
    components: { notesHeader },
    template: `
        <main class="notes-app">
            <notes-header></notes-header>
                {{notes}}
        </main>
    `,
    data() {
        return {
            notes: null,
        };
    },
    created() {
        noteService.query()
            .then(notes => console.log(notes));

    }
}