import { eventBus, NOTES_CLEAR_SEARCH } from "../../../event-bus.js";

export default {
    props: ['notes'],
    template: `
            <div class="search-bar">
                <input 
                    list="notes-suggest" 
                    v-model="term" 
                    @keyup.enter="searchTerm" 
                    class="search-bar-input" 
                    type="text"
                    placeholder="Search notes"
                />
                <datalist id="notes-suggest">
                    <option v-for="term in autoSuggest" :value="term"  :label="term"></option>
                </datalist>
                <button class="btn btn-clear-search" :class="{show: !!term}" title="Clear search" @click="clearSearch"><i class="fas fa-times"></i></button>
            </div>
    `,
    data() {
        return {
            term: '',
            isTyping: false,
        };
    },
    methods: {
        searchTerm() {
            this.$router.push({ path: `/notes/#search/${this.term}` });
        },
        clearSearch() {
            this.term = '';
            eventBus.$emit(NOTES_CLEAR_SEARCH)
        }
    },
    computed: {
        autoSuggest() {
            if (!this.notes || !this.term) return;
            let term = this.term.toLowerCase();
            return this.notes.map(note => {
                if (note.type === 'typeTodo') {
                    let todoTerm = note.data.filter(todo => (todo.txt.toLowerCase().includes(term)))[0];
                    if (todoTerm) return todoTerm.txt.slice(0,25);
                }
                else if (note.data.toLowerCase().includes(term)) return note.data.slice(0,25);
            }).slice(0, 5);
        },
        hasClicked() {
            return this.isTyping;
        }
    },
}