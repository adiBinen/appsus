import { eventBus, GLOBAL_NAV_CLOSE } from '../event-bus.js';
import utilService from '../services/util.service.js';

export default {
    props: ['unreadEmails'],
    template: `
            <nav class="global-nav" @click.stop>
                <button @click.stop="toggleNav" title="Hub apps">
                    <i class="material-icons">apps</i>
                </button>
                <div class="dropdown-menu" :class="isShown" @click.stop>
                    <router-link title="Home" to="/" exact>
                        <i class="fas fa-home"></i>
                    </router-link>
                    <router-link to="/email/inbox" title="E-Mail inbox">
                        <i class="fas fa-envelope"></i><span class="global-nav-unread-emails" v-if="unreadEmails">{{unreadEmails}}</span>
                    </router-link>
                    <router-link title="Notes" to="/notes"><i class="fas fa-sticky-note"></i></router-link>
                    <router-link title="Books" to="/books"><i class="fas fa-book"></i></router-link>
                </div>
                <img class="global-nav-user-img" :src="userImg" alt="User Profile Image" title="User profile"/>
            </nav>
    `,
    data() {
        return {
            isToggled: false,
            userImg: (utilService.getRandomIntInclusive(0,1))? 'https://ui-avatars.com/api/?name=S+I' : 'https://ui-avatars.com/api/?name=A+B',
        };
    },
    methods: {
        toggleNav() {
            this.isToggled = !this.isToggled;
            if (this.isToggled) {
                document.getElementById('app').addEventListener('click', function closeNav() {
                    eventBus.$emit(GLOBAL_NAV_CLOSE);
                    })
            }
        }
    },
    computed: {
        isShown() {
            return {show: this.isToggled};
        }
    },
    created() {
        eventBus.$on(GLOBAL_NAV_CLOSE, () => {
            this.isToggled = false;
            document.getElementById('app').removeEventListener('click', function closeNav() {
                eventBus.$emit(GLOBAL_NAV_CLOSE);
            });
        });
    }
}