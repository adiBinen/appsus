import reviewPreview from './review-preview.cmp.js';

export default {
    props: ['reviews'],
    components: {reviewPreview},
    template: `
        <ul class="review-list" v-if="hasReviews">
            <div class="review-container" v-for="review in reviews">
                <review-preview 
                    :key="review.id"
                    v-bind:review="review"
                >
                </review-preview>
                <button @click="deleteReview(review.id)" class="btn btn-delete-review">&times;</button>
            </div>
        </ul>
    `,
    methods: {
        deleteReview(reviewId) {
            this.$emit('delete-review', reviewId);
        }
    },
    computed: {
        hasReviews() {
            return this.reviews.length > 0;
        }
    }
}