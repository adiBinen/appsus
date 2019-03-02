
import navGlobal from '../../../cmps/nav-global.cmp.js';
import searchBar from '../cmps/searchbar.cmps.js';

export default {
    props: ['unreadEmails'],
    components: { navGlobal, searchBar },
    template: `
        <header class="email-header">
            <router-link to="/emails" tag="div" class="email-logo flex align-center">
                <button @click.stop="toggleSideNav" class="btn btn-toggle-nav">
                    <i class="fas fa-bars"></i>
                 </button>
                <img class="email-logo-img" src="./img/email.svg">
                <h1>MailsHub</h1>
            </router-link>
            <nav-global :unread-emails="unreadEmails"></nav-global>
            <search-bar></search-bar>
        </header>
    `,
    data() {
        return {
            emails: null,
        };
    },
    methods: {
        toggleSideNav() {
            this.$emit('toggle-nav');
        }
    }
}