import globalNav from '../../../cmps/nav-global.cmp.js';

export default {
    components: { globalNav },
    template: `
            <header class="notes-header">
                <h1>Notes App</h1>
                <global-nav></global-nav>
            </header>
    `,
}