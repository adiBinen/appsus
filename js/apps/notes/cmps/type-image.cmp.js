
export default {
    props: ['data', 'isEditable'],
    template: `
        <div class="type-image">
            <input v-model="data" v-show="isEditable">
            <img :src="data" />
        </div>
    `,
}