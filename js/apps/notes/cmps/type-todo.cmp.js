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
                {{todo.txt}}
            </li>
        </ul>
    `,
}