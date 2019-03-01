
import navGlobal from '../../../cmps/nav-global.cmp.js';

export default {
    props: ['unreadEmails'],
    components: { navGlobal},
    template: `
        <header class="email-header">
            <div class="email-logo flex align-center">
                <img class="email-logo-img" src="./img/emailLogo.jpg">
                <h1>MailsHub</h1>
            </div>
            <nav-global :unread-emails="unreadEmails"></nav-global>
        </header>
    `,
    data() {
        return {
            emails: null,
        };
    },
}