
export default {
    props: ['email'],
    template: ` 
        <tr class="email-preview">
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
                {{email.sentAt}}
           </td>
        </tr>
    `,
    data() {
        return {
            currentDate: null
        }
    },
    computed: {
        
    },
    mounted() {
        this.currentDate = Date.now();
    }
}