
import utilService from '../../../services/util.service.js'
import { eventBus, EMAIL_MODIFIED } from '../../../event-bus.js';

export default {
    props: ['email','draftState'],
    template: ` 
        <router-link tag="li" :to="(draftState)? '/email/#/drafts' : email.id" exact class="email-preview flex" :class="setUnread" @click.native="hello">
            <div class="checkbox-border" @click.stop="checkedEmail">
                <label class="checkbox-container" @click.stop="">
                    <input type="checkbox" @click.stop="checkedEmail" :checked="isChecked">
                    <span class="checkmark"></span>
                </label>
            </div>
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
            this.email.isChecked = !this.email.isChecked;
            eventBus.$emit(EMAIL_MODIFIED, { ...this.email });
        },
        startComposeEmail() {
            // EVENT BUS TO COMPOSE EMAIL
        }
    },
    computed: {
        isChecked() {
            return this.email.isChecked;
        },
        formattedDate() {
            return utilService.formatDate(this.email.sentAt);
        },
        setUnread() {
            return { unread: !this.email.isRead }
        },
    },
    mounted() {
    }
}