
export default {
    props: ['data', 'isEditable'],
    template: `
        <div class="note-type type-video">
            <input v-model="data" v-show="isEditable">
            <iframe :src="data"></iframe>
        </div>
    `,
}