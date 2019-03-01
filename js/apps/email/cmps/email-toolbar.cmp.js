
import {eventBus, EMAILS_CHECKED_MODIFIED} from '../../../event-bus.js';

export default {
    props: [],
    template: ` 
        <section class="email-toolbar">
            <button @click="deleteEmails">
                <i class="fas fa-trash-alt"></i>
            </button>
            <button>
                <i class="fas fa-envelope"></i>
            </button>
            <button @click="unreadEmails">
                <i class="fas fa-envelope-open"></i>
            </button>
        </section>
    `,
    data() {
        return {
        }
    },
    methods: {
        deleteEmails() {
            eventBus.$emit(EMAILS_CHECKED_MODIFIED, 'delete');
        },
        unreadEmails() {
            eventBus.$emit(EMAILS_CHECKED_MODIFIED, 'unread');
        }
    },
}