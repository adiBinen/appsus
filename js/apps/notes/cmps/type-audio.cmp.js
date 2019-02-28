
export default {
    props: ['data', 'isEditable'],
    template: `
        <div class="type-audio">
            <input v-model="data" v-show="isEditable">
            <audio controls :src="data"></audio>
        </div>
    `,
}