// All notes
import noteItem from './note-item.cmp.js';


export default {
    components: { noteItem },
    props: ['notes'],
    template: `
        <ul class="note-list" v-if="notes">
            <note-item v-for="note in notes" :key="note.id" :note="note">
            </note-item>
        </ul>
    `,
}