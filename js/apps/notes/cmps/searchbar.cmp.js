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
                    <option v-for="term in autoSuggest" :value="formatSuggestion(term)"></option>
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
        },
        formatSuggestion(term) {
            if (!term) return null;
            if (term.length > 25) return term.slice(0,25) + '...';
            else return term;
        },
    },
    computed: {
        autoSuggest() {
            if (!this.notes || !this.term) return;
            let term = this.term.toLowerCase();
            return this.notes.reduce((acc, note) => {
                if (note.type === 'typeTodo') {
                    note.data.forEach(todo => {
                        if (todo.txt.toLowerCase().includes(term)) acc.add(todo.txt);
                    })
                }
                else if (note.data.toLowerCase().includes(term)) acc.add(note.data);
                return acc;
            }, new Set())
        },
        hasClicked() {
            return this.isTyping;
        }
    },
}