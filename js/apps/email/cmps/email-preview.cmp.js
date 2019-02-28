
import utilService from '../../../services/util.service.js'

export default {
    props: ['email'],
    template: ` 
        <router-link tag="li" :to="email.id" exact class="email-preview flex" :class="setUnread">
            <label class="checkbox-container" @click.stop="">
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