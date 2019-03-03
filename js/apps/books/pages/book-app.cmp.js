// GLOBAL CMPS
import userMsg from '../../../cmps/user-msg-global.cmp.js';

import bookHeader from '../cmps/header.cmp.js';
import bookService from '../services/book.service.js';
import bookList from '../cmps/book-list.cmp.js';
import bookFilter from '../cmps/book-filter.cmp.js';


export default {
    props: ['unreadEmails'],
    components: { bookList, bookFilter, bookHeader, userMsg },
    template: `
        <main class="book-app">
            <book-header :unread-emails="unreadEmails"></book-header>
            <transition name="fade" mode="out-in">
                <router-view
                    v-if="books" 
                    :books="filterBooks"
                    :view-book="previewBook"
                    @filter="changeFilter"
                ></router-view>
            </transition>
            <user-msg></user-msg>
        </main>
    `,
    data() {
        return {
            books: null,
            filterBy: {
                title: '',
                minPrice: null,
                maxPrice: null,
            }
        }
    },
    created() {
        bookService.query()
            .then(booksDB => this.books = booksDB);
    },
    methods: {
        previewBook(book) {
            this.currViewedBook = book;
        },
        cancelPreview() {
            this.currViewedBook = null;
        },
        changeFilter(filterBy) {
            this.filterBy = filterBy;
        }
    },
    computed: {
        filterBooks() {
            let filteredBooks = this.books.slice();

            if (this.filterBy.title) filteredBooks = filteredBooks.filter(book => book.title.includes(this.filterBy.title.toLowerCase()));
            if (this.filterBy.minPrice) filteredBooks = filteredBooks.filter(book => book.listPrice.amount >= this.filterBy.minPrice);
            if (this.filterBy.maxPrice && this.filterBy.maxPrice > this.filterBy.minPrice) {
                filteredBooks = filteredBooks.filter(book => book.listPrice.amount <= this.filterBy.maxPrice);
            }

            return filteredBooks;
        }
    },
}