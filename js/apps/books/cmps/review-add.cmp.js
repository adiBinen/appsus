export default {
    template: `
            <form @submit.prevent="submitReview" class="add-book-review flex column">
                <div class="inner-form-container flex column">
                    <label>
                        Name:
                        <input ref="inputName" type="text" 
                            v-model.trim="review.name" placeholder="Your full name. e.g. 'John Doe'."
                            class="review-name"
                        />
                    </label>
                    <label> Read At:
                        <input type="date" v-model="review.readAt" required/>
                    </label>
                    <div class="review-rating">
                        Rate Book:
                        <button @click.stop.prevent="modifyRating(-1)" class="btn btn-dec-star"><i class="far fa-minus-square"></i></button>
                        <span class="review-stars">&nbsp;{{starsToShow}}&nbsp;</span>
                        <button @click.stop.prevent="modifyRating(1)" class="btn btn-inc-star"><i class="far fa-plus-square"></i></button>
                    </div>
                    <div class="review-text-title">Share Your Review:</div>
                    <textarea class="review-text" type="text" v-model.trim="review.txt"></textarea>
                    <button class="btn btn-submit" type="submit">Submit Review</button>
                </div>
            </form>
    `,
    data() {
        return {
            review: {
                name: '',
                readAt: null,
                rating: 1,
                txt: null,
            },
        }
    },
    mounted() {
        this.$refs.inputName.focus();
    },
    methods: {
        submitReview() {
            this.$emit('send-review', { ...this.review });
        },
        modifyRating(diff) {
            if (this.review.rating + diff < 1 || this.review.rating + diff > 5) return;
            this.review.rating += diff;
        }
    },
    computed: {
        starsToShow() {
            // const star = '☆';
            const star = '★';
            let str = '';
            for (let i = 0; i < this.review.rating; i++) {
                str += star;
            }
            return str;
        },
    }

}