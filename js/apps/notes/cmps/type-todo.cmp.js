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
                <input v-model="todo.txt" v-show="isEditable"/>
            </li>
        </ul>
    `,
    data() {
        return {
        };
    }
}