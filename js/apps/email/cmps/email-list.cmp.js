
import emailPreview from '../cmps/email-preview.cmp.js'

export default {
    components: {
        emailPreview
    },
    props: ['emails'],
    template: ` 
        <section class="email-list">
            <table v-if="emails">
                <email-preview v-for="email in emails" :key="email.id" :email="email">
                    
                </email-preview>
            </table>
        </section>
    `,
    data() {
        return {

        }
    }
}