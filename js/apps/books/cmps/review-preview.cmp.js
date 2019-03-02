export default {
    props: ['review'],
    template: `
        <li>
            <h4>
                Review By: <span>{{showReviewer}}</span>&nbsp; At: <span>{{showDate}}</span>&nbsp; Rating: <span class="review-stars">{{showRating}}</span>
            </h4>
            <p><span>Review:</span> {{review.txt}}</p>
        </li>
    `,
    computed: {
        showReviewer() {
            return (this.review.name)? this.review.name : 'Anonymous Reviewer';
        },
        showRating() {
            const star = '★';
            let str = '';
            for (let i = 0; i < this.review.rating; i++) {
                str += star;
            }
            return str;
        },
        showDate() {
            return this.review.readAt.split('-').reverse().join('-');
        }
    }

}

// A review looks like:
// { "name": "", "readAt": null, "rating": 1, "txt": null, "id": "_u6he2r79b" }