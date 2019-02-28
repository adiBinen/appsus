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
            >
                <div v-if="!isEditable">{{todo.txt}}</div>
                <input v-model="todo.txt" v-else="isEditable"/>
                <button v-if="isEditable" @click="removeTodo(todo.id)">
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
            let todoPointer = {
                id: utilService.generateId(),
                txt: '',
                isMarked: false,
            }
            this.todos.push(todoPointer);
            this.$emit('add-todo', todoPointer);
        },
        removeTodo(id) {
            // Remove todo from notes array in notes-app
            eventBus.$emit(NOTE_TODO_REMOVE, id);
            // Remove todo from this instance
            let idx = this.todos.findIndex(todo => todo.id === id);
            this.todos.splice(idx, 1);
        },
    },
    created() {
        console.log(this.todos)
    },
}