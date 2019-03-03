
import utilService from '../../../services/util.service.js'
import { eventBus, EMAIL_MODIFIED, EMAIL_DRAFT_COMPOSING } from '../../../event-bus.js';

export default {
    props: ['email','draftState'],
    template: ` 
        <router-link 
            tag="li" 
            :to="(draftState)? '/email/#/drafts' : '/email/' + email.id" exact 
            class="email-preview" :class="setUnread" 
            @click.native="startComposeEmail">
            
            <div title="Check e-mail" class="checkbox-border" @click.stop="checkedEmail">
                <label class="checkbox-container" @click.stop="">
                    <input type="checkbox" @click.stop="checkedEmail" :checked="isChecked">
                    <span class="checkmark"></span>
                </label>
            </div>
                <div title="Sender" class="sender">
                    {{email.sender}}
                </div>
                <div title="Subject" class="subject">
                    {{email.subject}}
                </div>
                <div title="Body" class="body">
                    {{email.body}}
                </div>
                <div title="Sent at" class="date">
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
            if (!this.draftState) return;
            eventBus.$emit(EMAIL_DRAFT_COMPOSING, {...this.email});
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
}