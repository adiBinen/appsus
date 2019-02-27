import emailService from '../services/email.service.js';

export default {
    template: `
        <section v-if="email">
            {{email}}
        </section>
    `,
    data() {
        return {
            email: null,
        };
    },
    created() {
        let emailId = this.$route.params.emailId;
        emailService.getEmailById(emailId)
            .then(email => this.email = email);
    }
}