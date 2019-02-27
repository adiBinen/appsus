import { eventBus, UNREAD_EMAILS } from '../../../event-bus.js';

import emailService from '../services/email.service.js';
import emailPreview from '../cmps/email-preview.cmp.js';

export default {
    components: {
        emailPreview
    },
    template: ` 
        <section class="email-list">
            <ul>
                <email-preview v-for="email in emails" :key="email.id" :email="email">
                    
                </email-preview>
            </ul>
        </section>
    `,
    data() {
        return {
            emails: null,
            unreadEmails: null,
        }
    },
    created() {
        emailService.query()
            .then(emails => this.emails = emails);

        emailService.getUnreadEmails()
            .then(unreadNum => eventBus.$emit(UNREAD_EMAILS, unreadNum));
    }
}