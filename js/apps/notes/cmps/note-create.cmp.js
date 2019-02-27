// Create note

export default {
    template: `
        <section class="note-create">
            <input ref="input"  type="text"
                @keyup.enter="createNote" v-model="note.data" :placeholder="setPlaceholder"
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
        </section>
    `,
    data() {
        return {
            note: {
                type: 'typeNote',
                data: '',
            },
            isSelected: {
                note: true,
                image: false,
                video: false,
                audio: false,
                todo: false,
            }
        };
    },
    methods: {
        changeType(type) {
            this.note.type = type;
        },
        createNote() {
            if (!this.note.data) return;
            this.$emit('note-created', { ...this.note });
            this.note.data = '';
            this.$refs.input.blur();
        }
    },
    computed: {
        setPlaceholder() {
            let placeholderStr = '';
            switch (this.note.type) {
                case 'typeNote':
                    placeholderStr = `What's on your mind?`;
                    break;
                case 'typeImage':
                    placeholderStr = 'Enter Image URL...';
                    break;
                case 'typeVideo':
                    placeholderStr = 'Enter Video URL...';
                    break;
                case 'typeAudio':
                    placeholderStr = 'Enter Audio URL...';
                    break;
                case 'typeTodo':
                    placeholderStr = 'Enter a list separated by commas.';
                    break;
            }
            return placeholderStr;
        }
    }
}