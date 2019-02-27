import emailService from '../services/email.service.js';

export default {
    template: `
        <section v-if="email" class="email-display">
            <header class="email-display-header">
                <h1>{{email.subject}}</h1>
                <div>{{email.sentAt}}</div>
            </header>
            <h2><span>From: </span>{{email.sender}}</h2>
            <p>{{email.body}}</p>
        </section>
    `,
    data() {
        return {
            email: null,
        };
    },
    created() {
        let emailId = this.$route.params.emailId;
        console.log(emailId);
        
        emailService.getEmailById(emailId)
            .then(email => this.email = email);
    }
}