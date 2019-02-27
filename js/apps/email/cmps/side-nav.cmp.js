export default {
    template: `
        <aside class="email-side-nav">
            <button>
                <i class="material-icons">add_circle_outline</i>
            </button>
            <router-link tag="button" to="/email/inbox" exact>
                <i class="material-icons">inbox</i>        
            </router-link>
            <button>BUTTON</button>
            <button>BUTTON</button>
            <button>BUTTON</button>
            <button>BUTTON</button>
        </aside>
    `,
}