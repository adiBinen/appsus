
export default {
    props: ['unreadEmails'],
    template: `
        <aside class="email-side-nav">
            <div class="btns-container">
                <button class="btn-compose" @click="openComposeEmail()">
                <i class="material-icons">
                    add
                </i>
                </button>

                <router-link class="btn-inbox" tag="button" to="/email/inbox" exact>
                    <i class="material-icons">inbox</i><span class="unread-emails">{{unreadEmails}}</span>       
                </router-link>

                <router-link class="btn-sent" tag="button" :to="'/email/#/' + 'sent'" exact>
                    <i class="material-icons">send</i>
                </router-link>

                <router-link class="btn-drafts" tag="button" :to="'/email/#/' + 'drafts'" exact>
                    <i class="material-icons">drafts</i>
                </router-link>

                <router-link class="btn-trash" tag="button" :to="'/email/#/' + 'trash'" exact>
                    <i class="material-icons">delete</i>
                </router-link>
            </div>
        </aside>
    `,
    data() {
        return {
        };
    },
    methods: {
        openComposeEmail() {
            this.$emit('openComposeEmail');
        },
    },
}