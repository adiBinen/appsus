import { eventBus, GLOBAL_NAV_CLOSE } from '../event-bus.js';
import utilService from '../services/util.service.js';

export default {
    props: ['unreadEmails'],
    template: `
            <nav class="global-nav" @click.stop>
                <button @click.stop="toggleNav" title="Hub apps">
                    <!-- <i class="material-icons">apps</i> -->
                    <img class="global-nav-img" src="./img/apps.svg"/>
                </button>
                <div class="dropdown-menu" :class="isShown" @click.stop>
                    <router-link title="MainHub" to="/" exact>
                        <img src="./img/wifi.svg"/>
                    </router-link>
                    <router-link class="email-icon" to="/email/inbox" title="MailsHub">
                        <img src="./img/email.svg"/>
                        <span class="global-nav-unread-emails" v-if="unreadEmails">{{unreadEmails}}</span>
                    </router-link>
                    <router-link title="NotesHub" to="/notes"><img src="./img/note.svg"/></router-link>
                    <router-link title="BooksHub" to="/books"><img src="./img/books.svg"/></router-link>
                    <router-link class="coming-soon" title="Coming soon!" to="#"><img src="./img/comingsoon/locations.png"/></router-link>
                    <router-link class="coming-soon" title="Coming soon!" to="#"><img src="./img/comingsoon/wikitube.png"/></router-link>
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