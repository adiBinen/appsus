
export default {
    props: ['data', 'isEditable'],
    template: `
        <div class="type-image">
            <div class="note-symbol">
                <i class="fas fa-image"></i>
            </div>
            <input v-model="dataCopy" v-show="isEditable">
            <img :src="data" />
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