// Create note

export default {
    template: `
        <section class="note-create">
            CREATE NOTE
            <input ref="input"  type="text" required
                @keyup.enter="createNote" v-model="note.data"
            />
            <button title="Note" @click="changeType('typeNote')">
                <i class="fas fa-font"></i>
            </button>
            <button title="Image" @click="changeType('typeImage')">
                <i class="fas fa-image"></i>
            </button>
            <button title="Video" @click="changeType('typeVideo')">
                <i class="fab fa-youtube"></i>
            </button>
            <button title="Audio" @click="changeType('typeAudio')">
                <i class="fas fa-headphones"></i>
            </button>
            <button title="Todo List" @click="changeType('typeTodo')">
                <i class="fas fa-list"></i>
            </button>
            <button @click="createNote" title="Add Note">
                <i class="fab fa-vuejs"></i>
            </button>
            END CREATE NOTE
        </section>
    `,
    data() {
        return {
            note: {
                type: 'typeNote',
                data: '',
            }
        };
    },
    methods: {
        changeType(type) {
            this.note.type = type;
        },
        createNote() {
            this.$emit('note-created', { ...this.note });
            this.note.data = '';
            this.$refs.input.blur();
        }
    }
}