
import utilService from '../../../services/util.service.js'
import { eventBus, EMAIL_MODIFIED } from '../../../event-bus.js';

export default {
    props: ['email'],
    template: ` 
        <router-link tag="li" :to="email.id" exact class="email-preview flex" :class="setUnread">
            <label class="checkbox-container" @click.stop="checkedEmail">
                <input type="checkbox">
                <span class="checkmark"></span>
            </label>
            <div class="sender">
                {{email.sender}}
            </div>
            <div class="subject">
                {{email.subject}}
            </div>
            <div class="body">
                {{email.body}}
            </div>
            <div class="date">
                {{formattedDate}}
            </div>
        </router-link>
    `,
    data() {
        return {
        }
    },
    methods: {
        checkedEmail() {
            if (!this.email.isChecked) {
                this.email.isChecked = true;
                eventBus.$emit(EMAIL_MODIFIED, { ...this.email });
            }
        }
    },
    computed: {
        formattedDate() {
            return utilService.formatDate(this.email.sentAt);
        },
        setUnread() {
            return { unread: this.email.isRead }
        },
    },
    mounted() {
    }
}