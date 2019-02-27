
import emailService from '../services/email.service.js';
import mainHeader from '../cmps/header.cmp.js';
import emailList from '../services/email.service.js';

export default {
    components: { mainHeader, emailList},
    template: `
        <main class="email-app">
            <main-header></main-header>
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