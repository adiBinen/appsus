
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
                    v-for="email in emails" 
                    :key="email.id" 
                    :email="email">
                </email-preview>
            </ul>
        </section>
    `,
    data() {
        return {
            emails: null,
        }
    },
    created() {
        emailService.query()
            .then(emails => this.emails = emails);
    }
}