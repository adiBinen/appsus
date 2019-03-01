// This is a type: note componenet that will render inside 'note-item'. Do not mistake it for a 'Note-item'. 
// Thanks.

export default {
    props: ['data', 'isEditable'],
    template: `
        <div class="type-note">
            <div class="note-content" v-if="!isEditable">{{data}}</div>
            <!-- <textarea class="edit-note" v-else="isEditable" v-model="dataCopy"></textarea> -->
            <div contenteditable="true" class="edit-note" v-else="isEditable" @input="update">{{dataCopy}}</div>
        </div>
    `,
    data() {
        return {
            isEditing: false,
            dataCopy: this.data,
        };
    },
    methods: {
        update(ev) {
            this.$emit('update-data', ev.target.innerHTML)
        }
    },
    watch: {
        dataCopy: {
            handler(val) {
                this.$emit('update-data', val);
            }
        }
    }
}