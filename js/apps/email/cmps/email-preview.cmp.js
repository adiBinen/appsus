
import utilService from '../../../services/util.service.js'

export default {
    props: ['email'],
    template: ` 
        <router-link tag="li" :to="'display' + email.id" exact class="email-preview flex">
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
    },
    mounted() {
        
    }
}