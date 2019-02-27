export default {
    template: `
            <nav class="global-nav">
                <button @click="isToggled = !isToggled">
                    <i class="material-icons">apps</i>
                </button>
                <div class="dropdown-menu" :class="isShown">
                    <router-link to="/" exact><i class="fas fa-home"></i></router-link>
                    <router-link to="/email/inbox"><i class="fas fa-envelope"></i></router-link>
                    <router-link to="/notes"><i class="fas fa-sticky-note"></i></router-link>
                    <router-link to="/books"><i class="fas fa-book"></i></router-link>
                </div>
            </nav>
    `,
    data() {
        return {
            isToggled: false,
        };
    },
    computed: {
        isShown() {
            return {show: this.isToggled};
        }
    },
}