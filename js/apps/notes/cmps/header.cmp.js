import globalNav from '../../../cmps/nav-global.cmp.js';
import searchBar from '../cmps/searchbar.cmp.js';
export default {
    props: ['unreadEmails', 'notes'],
    components: { globalNav, searchBar },
    template: `
            <header class="notes-header">
                <router-link to="/notes" tag="div" class="email-logo">
                    
                    <img class="email-logo-img" src="./img/note.svg">
                    <h1>NotesHub</h1>
                
                    <search-bar @click.stop :notes="notes"></search-bar>
                </router-link>
                <global-nav :unread-emails="unreadEmails"></global-nav>
            </header>
    `,
}