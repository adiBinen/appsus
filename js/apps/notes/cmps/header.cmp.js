import globalNav from '../../../cmps/nav-global.cmp.js';

export default {
    props: ['unreadEmails'],
    components: { globalNav },
    template: `
            <header class="notes-header">
                <h1>Notes App</h1>
                <global-nav :unread-emails="unreadEmails"></global-nav>
            </header>
    `,
}