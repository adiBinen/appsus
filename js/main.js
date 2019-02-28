import routes from './routes.js';
import homepage from './pages/homepage.cmp.js';

import emailService from './apps/email/services/email.service.js';

import { eventBus, UNREAD_EMAILS } from './event-bus.js';

const router = new VueRouter({ routes })

window.vueApp = new Vue({
    el: '#app',
    router,
    components: {
        homepage
    },
    data: {
        unreadEmails: null,
    },
    methods: {
        updateUnreadEmails() {
            emailService.getUnreadEmails()
                .then(unreadNum => this.unreadEmails = unreadNum);
        }
    },
    created() {
        emailService.getUnreadEmails()
                .then(unreadNum => this.unreadEmails = unreadNum);
        eventBus.$on(UNREAD_EMAILS, this.updateUnreadEmails);
    }
})