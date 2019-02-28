import emailService from '../services/email.service.js';
import utilService from '../../../services/util.service.js';

export default {
    template: `
        <section v-if="email" class="email-display">
            <header class="email-display-header">
                <h1 class="subject">{{email.subject}}</h1>
            </header>
            <div class="sent-date">{{formattedDate}}</div>
            <h2><span>From: </span>{{email.sender}}</h2>
            <p>{{email.body}}</p>
        </section>
    `,
    data() {
        return {
            email: null,
        };
    },
    computed: {
        formattedDate() {
            return utilService.formatDate(this.email.sentAt);
        }
    },
    created() {
        let emailId = this.$route.params.emailId;        
        emailService.getEmailById(emailId)
            .then(email => this.email = email);

        setTimeout(() => {
            this.email.isRead = true;
        })
    },
}