
import mainHeader from '../cmps/header.cmp.js';
import emailList from '../cmps/email-list.cmp.js';
import sideNav from '../cmps/side-nav.cmp.js';
import emailCompose from '../cmps/email-comopse.cmp.js';
import emailService from '../services/email.service.js';
import { eventBus, EMAIL_MODIFIED, EMAILS_CHECKED_MODIFIED } from '../../../event-bus.js';


export default {
    props: ['unreadEmails'],
    components: {
        mainHeader,
        sideNav,
        emailList,
        emailCompose
    },
    template: `
        <main class="email-app grid">
            <main-header></main-header>
            <side-nav :unread-emails="unreadEmails" @openComposeEmail="openComposeEmail()"></side-nav>
            <router-view  class="email-content"></router-view>
            <email-compose v-if="isComposing" @closeComposeEmail="closeComposeEmail" :username="username" :body="sentBody"></email-compose>
        </main>
    `,
    data() {
        return {
            username: 'adi',
            emails: null,
            isComposing: null,
            sentBody: null,
        };
    },
    methods: {
        openComposeEmail() {
            this.isComposing = true;
        },
        closeComposeEmail() {
            this.isComposing = false;
        }
    },
    created() {
        let { compose, body } = this.$route.query;
        this.isComposing = compose;
        this.sentBody = body;

        eventBus.$on(EMAIL_MODIFIED, newEmail => {
            emailService.modifyEmail(newEmail);
        })

        eventBus.$on(EMAILS_CHECKED_MODIFIED, action => {
            emailService.modifyChecked(action);
        })


    }
}