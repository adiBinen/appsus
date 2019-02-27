
import emailService from '../services/email.service.js';
import emailPreview from '../cmps/email-preview.cmp.js';

export default {
    components: {
        emailPreview
    },
    template: ` 
        <section class="email-list">
            <table v-if="emails">
                <email-preview v-for="email in emails" :key="email.id" :email="email">
                    
                </email-preview>
            </table>
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