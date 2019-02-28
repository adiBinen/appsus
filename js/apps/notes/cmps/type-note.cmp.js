// This is a type: note componenet that will render inside 'note-item'. Do not mistake it for a 'Note-item'. 
// Thanks.

export default {
    props: ['data', 'isEditable'],
    template: `
        <div class="type-note">
            <h1>HI I AM A TYPE-NOTE BRO, HERE'S YOUR DATA:</h1>
            <input v-show="isEditable" v-model="data" />
        </div>
    `,
    data() {
        return {
            isEditing: false,
        };
    },
    methods: {

    }
}