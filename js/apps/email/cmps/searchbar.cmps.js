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
                    <option v-for="term in autoSuggest" :value="term"  :label="term"></option>
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
        }
    },
    computed: {
        autoSuggest() {
            if (!this.emails || !this.term) return;
            let term = this.term.toLowerCase();
            return this.emails.map(email => {
                if (email.sender.toLowerCase().includes(term)) return email.sender;
                else if (email.recipient.toLowerCase().includes(term)) return email.recipient;
                else if (email.subject.toLowerCase().includes(term)) return email.subject.slice(0,25);
                else if (email.body.toLowerCase().includes(term)) return email.body.slice(0,25);
            }).slice(0, 5);
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