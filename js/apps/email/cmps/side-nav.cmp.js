
export default {
    props: ['unreadEmails'],
    template: `
        <aside class="email-side-nav">
            <div class="btns-container">
                <button class="btn-compose" @click="openComposeEmail()">
                    <i class="material-icons">add_circle_outline</i>
                </button>
                <router-link class="btn-inbox" tag="button" to="/email/inbox" exact>
                    <i class="material-icons">inbox</i><span class="unread-emails">{{unreadEmails}}</span>       
                </router-link>
                <button class="btn-sent">
                    <i class="material-icons">send</i>
                </button>
                <button class="btn-drafts">
                    <i class="material-icons">drafts</i>
                </button>
                <button class="btn-trash">
                    <i class="material-icons">delete</i>
                </button>
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