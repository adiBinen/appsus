
import emailService from '../../email/services/email.service.js';
import { eventBus, USER_MSG_SUCCESS } from '../../../event-bus.js';

export default {
    props: ['username', 'body', 'draftEmail'],
    template: `
        <section class="email-compose grid">
            <header class="compose-header flex align-center space-between">
                <p>New message</p>
                <button title="Close & save draft" @click="closeComposeEmail"><i class="fas fa-times"></i></button>
            </header>
            <form @submit.prevent.stop="sendEmail" class="compose-email-form grid">
                <input 
                    type="email" 
                    class="recipient-input" 
                    placeholder="To" 
                    v-model="email.recipient" required>
                <input type="text" class="subject-input" placeholder="Subject" v-model="email.subject">
                <textarea type="text" class="subject-input" v-model="email.body"></textarea>
                <div class="compose-toolbar flex space-between">
                    <button class="compose-send-btn" type="submit">Send</button>    
                    <button title="Discard draft" @click="discardDraft(email.id)">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </form>
        </section>
    `,
    data() {
        return {
            email: {
                sender: this.username,
                recipient: null,
                subject: null,
                body: null,
            }
        };
    },
    methods: {
        sendEmail() {
            this.$emit('email-sent');
            emailService.addEmail({...this.email})
                .then(msg => eventBus.$emit(USER_MSG_SUCCESS, msg));
            this.email = {
                sender: this.username,
                recipient: null,
                subject: null,
                body: null,
            };
        },
        closeComposeEmail() {
            this.$emit('closeComposeEmail', {...this.email});
        },
        discardDraft(id) {
            this.$emit('discardDraft', id);
        }
    },
    computed: {
    },
    mounted() {
        if (this.draftEmail && this.draftEmail.id) {
        this.email = {...this.draftEmail};
        } else {
            this.email.body = this.body;
        }
    }
}