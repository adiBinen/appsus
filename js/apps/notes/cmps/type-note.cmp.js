// This is a type: note componenet that will render inside 'note-item'. Do not mistake it for a 'Note-item'. 
// Thanks.

export default {
    props: ['data'],
    template: `
        <div class="type-note">
            <h1>HI I AM A TYPE-NOTE BRO, HERE'S YOUR DATA:</h1>
            <input :readonly="!isEditing" @click="isEditing = true" @blur="isEditing = false" v-model="data" />
        </div>
    `,
    data() {
        return {
            isEditing: false,
        };
    },
    methods: {
        toggleEdit() {
            this.isEditing = !this.isEditing
        },
    }
}