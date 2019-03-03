import navCmp from './nav.cmp.js';
import globalNav from '../../../cmps/nav-global.cmp.js';

export default {
    props: ['unreadEmails'],
    components: { navCmp, globalNav },
    template: `
         <header class="books-header flex row">
             <button @click="toggleNav" class="btn btn-nav-toggle"><i class="fas fa-bars"></i></button>
            <router-link tag="div" to="/books/" class="logo">
                <img class="logo-img" src="./img/books.svg" />
                <h1>BooksHub</h1>
            </router-link>
            <nav-cmp @click.stop :class="isShowNav">

            </nav-cmp>
            <global-nav :unread-emails="unreadEmails"></global-nav>
        </header>
    `,
    data() {
        return {
            isNavToggled: false,
        }
    },
    methods: {
        toggleNav() {
            this.isNavToggled = !this.isNavToggled;
        }
    },
    computed: {
        isShowNav() {
            return { show: this.isNavToggled };
        },
    }
}