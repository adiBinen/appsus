
import emailService from '../../email/services/email.service.js';

export default {
    template: `
        <section class="email-compose">
            <header>
                <p>New message</p>
                <button @click="closeComposeEmail()">X</button>
            </header>
            <form @submit.prevent="sendEmail()" class="flex">
                <input type="text" class="recipient-input" placeholder="To" v-model="email.recipient" required>
                <input type="text" class="subject-input" placeholder="Subject" v-model="email.subject">
                <textarea type="text" class="subject-input" v-model="email.body"></textarea>
                <button type="submit">Send</button>
            </form>
        </section>
    `,
    props: ['username'],
    data() {
        return {
            email: {
                sender: this.username,
                recipient: null,
                subject: null,
                body: null
            }
        };
    },
    methods: {
        sendEmail() {
            emailService.addEmail({...this.email})
                .then(this.closeComposeEmail);
        },
        closeComposeEmail() {
            this.$emit('closeComposeEmail');
        }
    },
    computed: {
        
    },
    created() {
    }
}