
export default {
    props: ['email'],
    template: ` 
        <router-link tag="tr" to="" class="email-preview">
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
                {{formmatedDate}}
           </td>
        </router-link>
    `,
    data() {
        return {
            currentDate: null
        }
    },
    computed: {
        formmatedDate() {
            let sentAtDate = new Date(this.email.sentAt);
            let yyyy = (this.currentDate.getFullYear() === sentAtDate.getFullYear()) ? '' : sentAtDate.getFullYear();

        }
    },
    mounted() {
        this.currentDate = new Date();
    }
}