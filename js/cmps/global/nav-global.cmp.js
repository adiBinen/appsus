export default {
    template: `
            <nav>
                <button>
                    <i class="fab fa-buromobelexperte"></i>
                </button>
                <div>
                    <router-link to="/" exact><i class="fas fa-home"></i></router-link>
                    <router-link to="/email"><i class="fas fa-envelope"></i></router-link>
                    <router-link to="/notes"><i class="fas fa-sticky-note"></i></router-link>
                    <router-link to="/books"><i class="fas fa-book"></i></router-link>
                </div>
            </nav>
    `,
}