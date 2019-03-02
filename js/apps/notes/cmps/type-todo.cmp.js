import utilService from '../../../services/util.service.js';

export default {
    props: ['data', 'isEditable'],
    template: `
        <ul class="type-todo">
            <div class="note-symbol">
                <i class="fas fa-list"></i>
            </div>
            <li 
                class="todo-item"
                v-for="todo in todos" 
                :key="todo.id"
                :class="{marked: todo.isMarked}"
                @click="toggleMarked(todo.id)"
            >
                <div v-if="!isEditable">{{todo.txt}}</div>
                <input v-model="todo.txt" v-else="isEditable"/>
                <button class="btn-remove-todo" v-if="isEditable" @click.stop="removeTodo(todo.id)">
                    <i class="fas fa-minus"></i>
                </button>
            </li>
            <button class="btn-add-todo" v-if="isEditable" @click="addTodo">
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
                id: '-' + utilService.generateId(),
                txt: '',
                isMarked: false,
            }
            this.todos.push(todoPointer);
        },
        removeTodo(id) {
            let idx = this.todos.findIndex(todo => todo.id === id);
            this.todos.splice(idx, 1);
          
        },
        toggleMarked(id) {
            if (this.isEditable) return;
            let todo = this.todos.find(todo => todo.id === id);
            todo.isMarked = !todo.isMarked;
        },
    },
    watch: {
        todos: {
            handler(val) {
                // On change fire an event that will eventually lead to eventBus -> notes-app and replace the todos with the updated one.
                // works on add/remove/mark/text-edit
                this.$emit('modify-todos', val);
            },
            deep: true,
        }
    }
}