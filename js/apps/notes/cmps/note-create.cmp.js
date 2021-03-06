import utilService from '../../../services/util.service.js';

// Create note

export default {
    template: `
        <section class="note-create">
            <div class="input-container" v-if="note.type !== 'typeTodo'">
                <input ref="input-normal"  type="text" autofocus
                    @keyup.enter="createNote" v-model="note.data" :placeholder="setPlaceholder" 
                />
                <button @click="createNote" title="Add Note">
                    <i class="fab fa-vuejs"></i>
                </button>
            </div>
            <div v-else class="todo-input">
                <div class="input-container" v-for="(todo, index) in todos">
                    <input :ref="'input-todo' + index"  type="text" autofocus
                        @keyup.enter="createNote" v-model="todo.txt" :placeholder="setPlaceholder" 
                    />
                    <button title="Remove Todo" class="remove-todo" @click="removeTodo(todo.id)" v-if="index !== (todos.length - 1)">
                        <i class="fas fa-minus"></i>
                    </button>
                    <button title="Add Todo" class="add-todo" @click="addTodo" v-if="index === (todos.length - 1)">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button @click="createNote" title="Add Note" v-if="index === (todos.length - 1)">
                        <i class="fab fa-vuejs"></i>
                    </button>
                </div>
            </div>
            <div class="note-create-btns-container">
                <button title="Note" @click="changeType('typeNote')" :class="{selected: note.type === 'typeNote'}">
                    <i class="fas fa-font"></i>
                </button>
                <button title="Image" @click="changeType('typeImage')" :class="{selected: note.type === 'typeImage'}">
                    <i class="fas fa-image"></i>
                </button>
                <button title="Video" @click="changeType('typeVideo')" :class="{selected: note.type === 'typeVideo'}">
                    <i class="fab fa-youtube"></i>
                </button>
                <button title="Audio" @click="changeType('typeAudio')" :class="{selected: note.type === 'typeAudio'}">
                    <i class="fas fa-headphones"></i>
                </button>
                <button title="Todo List" @click="changeType('typeTodo')" :class="{selected: note.type === 'typeTodo'}">
                    <i class="fas fa-list"></i>
                </button>
            </div>
            
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
            },
            todos: [],
        };
    },
    methods: {
        changeType(type) {
            // Avoid bugs
            if (this.note.type === type) return;
            this.note.type = type;
            if (type === 'typeTodo') {
                this.todos = [{ id: utilService.generateId(), txt: '' }];
            }
            else setTimeout(() => this.$refs['input-normal'].focus(), 500);
        },
        addTodo() {
            this.todos.push({ id: utilService.generateId(), txt: '' });
        },
        removeTodo(id) {
            if (this.todos.length === 1) return;
            this.todos = this.todos.filter(todo => todo.id !== id);
        },
        createNote() {
            if (this.note.type === 'typeTodo') {
                // MAKE SURE TODO IS NOT EMPTY
                if (this.todos.every(todo => todo.txt === '')) return;
                this.note.data = this.todos.filter(todo => todo.txt !== '');
            }
            if (!this.note.data) return;
            this.$emit('note-created', { ...this.note });
            this.note.data = '';
            this.todos = this.todos = [{ id: utilService.generateId(), txt: '' }];
            // If we are not on todo, focus on input again!
            if (this.note.type !== 'typeTodo') this.$refs['input-normal'].focus();
        },
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
                    placeholderStr = 'Enter a Todo.';
                    break;
            }
            return placeholderStr;
        },
    },
}