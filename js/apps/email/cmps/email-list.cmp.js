
import emailService from '../services/email.service.js';
import emailPreview from '../cmps/email-preview.cmp.js';
import emailToolbar from '../cmps/email-toolbar.cmp.js';
import { eventBus, EMAILS_SEARCHBAR } from '../../../event-bus.js';

export default {
    components: {
        emailPreview,
        emailToolbar
    },
    template: ` 
        <section class="email-list">
            <email-toolbar></email-toolbar>
            <ul>
                <email-preview 
                    v-if="emailsToDisplay && emails"
                    v-for="email in emailsToDisplay" 
                    :key="email.id" 
                    :email="email"
                    :draft-state="draftState"
                >
                </email-preview>
            </ul>
        </section>
    `,
    data() {
        return {
            emails: null,
            filterBy: this.$route.params.filterBy,
            draftState: false,
        }
    },
    computed: {
        emailsToDisplay() {
            if (!this.emails) return;
            let filter;
            if (this.filterBy === '#/trash') {
                filter = 'isDeleted';
                this.draftState = false;
            } else if (this.filterBy === '#/sent') {
                filter = 'isSent';
                this.draftState = false;
            } else if (this.filterBy === '#/drafts') {
                filter = 'isDraft';
                this.draftState = true;
            } else if (this.filterBy.includes('#search')) {
                // IF SEARCHBAR WAS ACTIVATED
                let term = this.filterBy.replace(/#search\//, '').toLowerCase();
                return this.emails.filter(email => 
                    email.sender.toLowerCase().includes(term) || 
                    email.recipient.toLowerCase().includes(term) || 
                    email.subject.toLowerCase().includes(term) || 
                    email.body.toLowerCase().includes(term) 
                ).sort((email1, email2) => email2.sentAt - email1.sentAt);

            } else {
                this.draftState = false;
                return this.emails.filter(email => !email.isDeleted && !email.isDraft && !email.isSent);
            }

            return this.emails.filter(email => email[filter]);
        },
    },
    watch: {
        $route(to, from) {
            // Get hash form routing to filter emails
            this.filterBy = to.hash;
        }
    },
    created() {
        this.filterBy = this.$route.hash;
        emailService.query()
            .then(emails => {
                this.emails = emails;
                eventBus.$emit(EMAILS_SEARCHBAR, this.emails)
            });
    }
}