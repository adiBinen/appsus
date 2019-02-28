
export default {
    props: ['data', 'isEditable'],
    template: `
        <div class="note-type type-video">
            <h1>I hope you chose a good band to play below</h1>
            <input v-model="data" v-show="isEditable">
            <iframe :src="data"></iframe>
        </div>
    `,
}