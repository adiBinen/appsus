
import navGlobal from '../../../cmps/nav-global.cmp.js';

export default {
    components: { navGlobal},
    template: `
        <header class="email-header">
            <h1>E-Mail App</h1>
            <nav-global></nav-global>
        </header>
    `,
    data() {
        return {
            emails: null,
        };
    },
}