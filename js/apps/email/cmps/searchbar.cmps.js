import { eventBus, EMAILS_SEARCHBAR } from "../../../event-bus.js";

export default {
    template: `
            <div class="search-bar">
                <input 
                    list="emails-suggest" 
                    v-model="term" 
                    @keyup.enter="searchTerm" 
                    class="search-bar-input" 
                    type="text"
                    placeholder="Search mail"
                />
                <datalist id="emails-suggest">
                    <option v-for="term in autoSuggest" :value="formatSuggestion(term)" ></option>
                </datalist>
                <button class="btn btn-clear-search" :class="{show: !!term}" title="Clear search" @click="clearSearch"><i class="fas fa-times"></i></button>
            </div>
    `,
    data() {
        return {
            term: '',
            emails: null,
            isTyping: false,
        };
    },
    methods: {
        searchTerm() {
            this.$router.push({ path: `/emails/#search/${this.term}` });
        },
        clearSearch() {
            this.term = '';
        },
        formatSuggestion(term) {
            if (!term) return null;
            if (term.length > 25) return term.slice(0, 25) + '...';
            else return term;
        }
    },
    computed: {
        autoSuggest() {
            if (!this.emails || !this.term) return;
            let term = this.term.toLowerCase();
            return [...this.emails.reduce((acc, email) => {
                if (email.sender.toLowerCase().includes(term)) acc.add(email.sender);
                else if (email.recipient.toLowerCase().includes(term)) acc.add(email.recipient);
                else if (email.subject.toLowerCase().includes(term)) acc.add(email.subject);
                else if (email.body.toLowerCase().includes(term)) acc.add(email.body);
                return acc;
            }, new Set())].slice(0,7);
        },
        hasClicked() {
            return this.isTyping;
        }
    },
    mounted() {
        eventBus.$on(EMAILS_SEARCHBAR, emails => this.emails = emails);
    },
    beforeDestroy() {
        eventBus.$off(EMAILS_SEARCHBAR);
    }

}