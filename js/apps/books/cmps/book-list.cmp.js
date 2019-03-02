import bookPreview from './book-preview.cmp.js';

export default {
    components: {
        bookPreview,
    },
    props: ['books'],
    template: `
            <section>
                <transition-group name="list" tag="ul" class="book-list grid">
                    <li v-for="book in books" :key="book.id">
                        <router-link :to="'/books/#/book' + book.id + '/' + book.title">
                            <book-preview 
                                v-bind:book="book"
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
        
    },
    computed: {

    },
}