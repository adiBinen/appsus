import navGlobal from './nav-global.cmp.js';

export default {
    props: ['unreadEmails'],
    components: {
        navGlobal,
    },
    template: `
        <header class="homepage-header">
            <div class="logo flex align-center">
                <img class="homepage-logo" src="./img/wifi.svg" />
                <h1>MainHub</h1>
            </div>
            <nav-global :unread-emails="unreadEmails"></nav-global>
        </header> 
    `,

}