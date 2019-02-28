export default {
    props: ['data'],
    template: `
        <ul class="type-todo">
            <li 
                class="todo-item"
                v-for="todo in data" 
                :key="todo.id"
                :class="{marked: todo.isMarked}"
            >
                <input v-model="todo.txt" :readonly="!isEditable"/>
            </li>
        </ul>
    `,
    data() {
        return {
            isEditable: false,
        };
    }
}