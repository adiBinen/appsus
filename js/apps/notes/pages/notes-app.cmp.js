import noteService from '../services/note.service.js';
import notesHeader from '../cmps/header.cmp.js';

export default {
    components: { notesHeader },
    template: `
        <main class="notes-app">
            <notes-header></notes-header>
            <section v-if="notes">
                {{notes}}
            </section>
        </main>
    `,
    data() {
        return {
            notes: null,
        };
    },
    created() {
        noteService.query()
            .then(notes => this.notes = notes)
    }
}