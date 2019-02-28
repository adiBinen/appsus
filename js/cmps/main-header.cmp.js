import navGlobal from './nav-global.cmp.js';

export default {
    props: ['unreadEmails'],
    components: {
        navGlobal,
    },
    template: `
        <header class="homepage-header">
            <h1>Homepage</h1>
            <nav-global :unread-emails="unreadEmails"></nav-global>
        </header> 
    `,

}