import globalNav from '../../../cmps/nav-global.cmp.js';

export default {
    props: ['unreadEmails'],
    components: { globalNav },
    template: `
         <header class="books-header flex row">
            <router-link tag="div" to="/books/" class="logo flex align-center">
                <img class="logo-img" src="./img/books.svg" />
                <h1>BooksHub</h1>
            </router-link>
            <global-nav :unread-emails="unreadEmails"></global-nav>
        </header>
    `,
    data() {
        return {
        }
    },
    methods: {
    },
    computed: {
    }
}