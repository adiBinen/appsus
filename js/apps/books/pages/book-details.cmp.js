import bookService from '../services/book.service.js';
import reviewAdd from '../cmps/review-add.cmp.js'
import reviewList from '../cmps/review-list.cmp.js'
import { eventBus } from '../../../event-bus.js';

// Scroll bellow to see how book object looks like
export default {
    components: {
        reviewAdd, reviewList
    },
    template: `
        <section v-if="book" class="book-container">
            <button class="btn btn-back" @click="goBack">
                <i class="far fa-caret-square-left"></i> <span>Back</span>
            </button>
            <article class="book-details flex" >
                <img class="book-image" :src="book.thumbnail" alt="Book Cover"/>
                <div class="details-content flex column">
                    <h2 class="book-title">
                        {{book.title}}
                    </h2>
                    <h3 class="book-subtitle">{{book.subtitle}}</h3>
                    <h3 class="book-authors">
                        Author:&nbsp;<span v-for="author in book.authors">{{author}}&nbsp;</span>
                    </h3>
                    <h4>
                        Price: <span>{{getCurrencyChar}}{{book.listPrice.amount}}</span>
                        <span class="badge" v-show="book.listPrice.isOnSale">On sale</span>
                    </h4>
                    <h5>Publication Year: <span>{{book.publishedDate}}</span>
                        <span v-show="isNew" class="badge">New</span>
                        <span v-show="isVeteran" class="badge">Veteran</span></h5>
                    <h6 class="book-level">For: <span>{{getBookLevel}}</span></h6>
                    <p class="book-locale">Language: <span>{{book.language}}</span></p>
                    <p class="book-description short"
                        v-if="!isFullDesc" 
                        @click="isFullDesc = !isFullDesc"
                    >
                        {{getShortDesc}}
                    </p>
                    <p class="book-description long" 
                        v-else-if="isFullDesc"
                        @click="isFullDesc = !isFullDesc"
                    >
                        {{book.description}}
                    </p>
                </div>
            </article>
            <hr />
            <article class="book-reviews-container flex column">
                <button @click="showAddReview" class="btn btn-add-review" :class="{red: isAddReview}">{{isReviewing}}</button>
                <transition name="fade">
                    <review-add 
                        v-if="isAddReview"
                        v-on:send-review="addBookReview"
                    ></review-add>
                </transition>
                <review-list 
                    v-if="!isAddReview"
                    v-on:delete-review="deleteBookReview" 
                    v-bind:reviews="book.reviews"
                ></review-list>
            </article>
        </section>
    `,
    data() {
        return {
            shortDesc: null,
            isFullDesc: false,
            book: null,
            isAddReview: false,
        }
    },
    created() {
        bookService.getBookById(this.$route.params.bookId)
            .then(book => this.book = book);
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        addBookReview(review) {
            bookService.addBookReview(review, this.book.id)
                .then(res => console.log(res));
            this.isAddReview = false;
        },
        deleteBookReview(reviewId) {
            bookService.deleteBookReview(reviewId, this.book.id)
                .then(res => console.log(res));
        },
        showAddReview() {
            this.isAddReview = !this.isAddReview;
        }
    },
    computed: {
        getCurrencyChar() {
            let currencyCode = this.book.listPrice.currencyCode;
            if (currencyCode === 'USD') return '$';
            else if (currencyCode === 'EUR') return '€';
            else if (currencyCode === 'ILS') return '₪';
        },
        getBookLevel() {
            let pagesNum = this.book.pageCount;
            if (pagesNum > 500) return 'Expert Readers';
            else if (pagesNum > 200) return 'Intermediate Readers';
            else return 'Novice Readers';
        },
        getShortDesc() {
            let str = this.book.description;
            if (!str) return '';
            return (str.length > 100) ? str.slice(0, 100) + '...' : str.slice(0, 100);
        },
        isVeteran() {
            return (new Date(Date.now()).getFullYear() - this.book.publishedDate) >= 10;
        },
        isNew() {
            return (new Date(Date.now()).getFullYear() - this.book.publishedDate) < 2;
        },
        isReviewing() {
            return (!this.isAddReview)? 'Add Review': 'Discard Review';
        }
    },
}


/* how a book object looks like
{ "id": "vxYYYdVlEH3",
    "title": "donec mi ullamcorper",
    "subtitle": "varius malesuada augue molestie sollicitudin faucibus mi eu tempus",
    "authors": [ "William Shakespeare" ],
    "publishedDate": 2011,
    "description": "aliquet euismod mi vivamus bibendum donec etiam quisque iaculis ullamcorper est sed",
    "pageCount": 904,
    "categories": [ "Computers", "Hack" ],
    "thumbnail": "http://coding-academy.org/books-photos/2.jpg",
    "language": "sp",
    "listPrice": { "amount": 186, "currencyCode": "ILS", "isOnSale": true } }

*/