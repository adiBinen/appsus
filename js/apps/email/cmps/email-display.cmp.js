import emailService from '../services/email.service.js';

export default {
    template: `
        <section v-if="email">
            {{email}} 
            <h1>hey</h1>
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