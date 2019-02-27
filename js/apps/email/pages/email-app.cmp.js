
import emailService from '../services/email.service.js';
import emailList from '../services/email.service.js';

export default {
    components: { emailList},
    template: `
        <main>
            <email-list :emails="emails">
            </email-list>
        </main>
    `,
    data() {
        return {
            emails: null,
        };
    },
    created() {
        emailService.query()
            .then(emails => this.emails = emails);
    }
    
}