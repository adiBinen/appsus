
import emailService from '../services/email.service.js';
import emailPreview from '../cmps/email-preview.cmp.js';
import emailToolbar from '../cmps/email-toolbar.cmp.js';

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
                    :email="email">
                </email-preview>
            </ul>
        </section>
    `,
    data() {
        return {
            emails: null,
            filterBy: this.$route.params.filterBy,
        }
    },
    computed: {
        emailsToDisplay() {
            if (!this.emails) return;
            console.log(this.filterBy);
            let filter;
            if (this.filterBy === 'trash') filter = 'isDeleted';
            else if (this.filterBy === 'sent') filter = 'isSent';
            else if (this.filterBy === 'drafts') filter = 'isDraft';
            else return this.emails.filter(email => !email.isDeleted && !email.isDraft && !email.isSent);

            return this.emails.filter(email => email[filter]);
        }
    },
    watch: {
        $route(to, from) {
            this.filterBy = to.params.filterBy;
            console.log(this.filterBy);
            

        }
    },
    created() {
        emailService.query()
            .then(emails => {
                this.emails = emails;
            });
    }
}