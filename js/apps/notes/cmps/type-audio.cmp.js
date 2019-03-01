
export default {
    props: ['data', 'isEditable'],
    template: `
        <div class="type-audio">
            <input v-model="dataCopy" v-show="isEditable">
            <audio class="note-content" controls :src="data"></audio>
        </div>
    `,
    data() {
        return {
            isEditing: false,
            dataCopy: this.data,
        };
    },
    methods: {

    },
    watch: {
        dataCopy: {
            handler(val) {
                this.$emit('update-data', val);
            }
        }
    }
}