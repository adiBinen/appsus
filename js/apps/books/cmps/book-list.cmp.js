import bookPreview from './book-preview.cmp.js';
import bookFilter from './book-filter.cmp.js';

export default {
    components: {
        bookPreview, bookFilter,
    },
    props: ['books'],
    template: `
            <section class="book-list">
                <book-filter 
                    @filter="changeFilter"
                ></book-filter>
                <transition-group name="list" tag="ul" class="book-list grid">
                    <li v-for="book in books" :key="book.id">
                        <router-link :to="'/books/' + book.id + '/' + book.title">
                            <book-preview 
                                :book="book"
                            ></book-preview>
                        </router-link>
                    </li>
                </transition-group>
            </section>
    `,
    data() {
        return {
            selectedBook: null,
        }
    },
    methods: {
        changeFilter(filterBy) {
            this.$emit('filter', filterBy)
        }
    },
    computed: {

    },
}