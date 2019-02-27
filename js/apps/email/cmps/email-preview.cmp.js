
import utilService from '../../../services/util.service.js'

export default {
    props: ['email'],
    template: ` 
        <router-link tag="tr" :to="'display' + email.id" exact class="email-preview">
           <td>
                {{email.sender}}
           </td>
           <td>
                {{email.subject}}
           </td>
           <td>
                {{email.body}}
           </td>
           <td>
                {{formattedDate}}
           </td>
        </router-link>
    `,
    data() {
        return {
            
        }
    },
    computed: {
        formattedDate() {
            return utilService.formatDate(this.email.sentAt);
        }
    },
    mounted() {
        
    }
}