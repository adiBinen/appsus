export default {
    props: ['data', 'isEditable'],
    template: `
        <ul class="type-todo">
            <li 
                class="todo-item"
                v-for="todo in data" 
                :key="todo.id"
                :class="{marked: todo.isMarked}"
            >
                <div v-if="!isEditable">{{todo.txt}}</div>
                <input v-model="todo.txt" v-else="isEditable"/>
            </li>
        </ul>
    `,
    data() {
        return {
        };
    }
}