import globalNav from '../../../cmps/nav-global.cmp.js';

export default {
    props: ['unreadEmails'],
    components: { globalNav },
    template: `
            <header class="notes-header">
            <router-link to="/notes" tag="div" class="email-logo flex align-center">
                <img class="email-logo-img" src="./img/note.svg">
                <h1>NotesHub</h1>
            </router-link>
            <global-nav :unread-emails="unreadEmails"></global-nav>
            </header>
    `,
}