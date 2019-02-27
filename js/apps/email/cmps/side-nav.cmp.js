export default {
    template: `
        <aside class="email-side-nav">
            <div class="btns-container">
                <button class="btn-compose" @click="openComposeEmail()">
                    <i class="material-icons">add_circle_outline</i>
                </button>
                <router-link class="btn-inbox" tag="button" to="/email/inbox" exact>
                    <i class="material-icons">inbox</i>        
                </router-link>
                <button class="btn-sent">
                    <i class="material-icons">send</i>
                </button>
                <button>BUTTON</button>
                <button>BUTTON</button>
                <button>BUTTON</button>
            </div>
        </aside>
    `,
    methods: {
        openComposeEmail() {
            this.$emit('openComposeEmail');
        }
    }
}