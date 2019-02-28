
import {eventBus, EMAILS_DELETE} from '../../../event-bus.js';

export default {
    props: [],
    template: ` 
        <section class="email-toolbar">
            <button @click="deleteEmails">
                <i class="fas fa-trash-alt"></i>
            </button>
        </section>
    `,
    data() {
        return {
        }
    },
    methods: {
        deleteEmails() {
            // eventBus.$emit(EMAILS_DELETE);
        }
    },
}