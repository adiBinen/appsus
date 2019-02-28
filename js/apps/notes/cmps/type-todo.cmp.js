import utilService from '../../../services/util.service.js';
import { eventBus, NOTE_TODO_REMOVE } from '../../../event-bus.js';

export default {
    props: ['data', 'isEditable'],
    template: `
        <ul class="type-todo">
            <li 
                class="todo-item"
                v-for="todo in todos" 
                :key="todo.id"
                :class="{marked: todo.isMarked}"
                @click="toggleMarked(todo.id)"
            >
                <div v-if="!isEditable">{{todo.txt}}</div>
                <input v-model="todo.txt" v-else="isEditable"/>
                <button v-if="isEditable" @click.stop="removeTodo(todo.id)">
                    <i class="fas fa-minus"></i>
                </button>
            </li>
            <button v-if="isEditable" @click="addTodo">
                <i class="fas fa-plus"></i>
            </button>
        </ul>
    `,
    data() {
        return {
            todos: this.data.map(todo => {
                return {
                    id: todo.id,
                    txt: todo.txt,
                    isMarked: todo.isMarked,
                }
            }),
        };
    },
    methods: {
        addTodo() {
            this.todos.push({
                id: '-' + utilService.generateId(),
                txt: '',
                isMarked: false,
            });
            this.$emit('add-todo', this.todos[length - 1]);
        },
        removeTodo(id) {
            // Remove todo from notes array in notes-app
            eventBus.$emit(NOTE_TODO_REMOVE, id);
            // Remove todo from this instance
            let idx = this.todos.findIndex(todo => todo.id === id);
            this.todos.splice(idx, 1);
        },
        toggleMarked(id) {
            if (this.isEditable) return;
            let todo = this.todos.find(todo => todo.id === id);
            todo.isMarked = !todo.isMarked;
            this.$emit('mark-todo', id);
        },

    },
    watch: {
        todos: {
            handler(val) {
                if (!val) return;
                this.$emit('modify-todos', val);
            },
            deep: true,
        }
    }

}