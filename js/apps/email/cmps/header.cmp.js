
import navGlobal from '../../../cmps/nav-global.cmp.js';

export default {
    props: ['unreadEmails'],
    components: { navGlobal},
    template: `
        <header class="email-header">
            <h1>E-Mail App</h1>
            <nav-global :unread-emails="unreadEmails"></nav-global>
        </header>
    `,
    data() {
        return {
            emails: null,
        };
    },
}