export default {
    props: ['review'],
    template: `
        <li>
            <p><span>Review By:&nbsp;</span>{{showReviewer}}</p>
            <p><span>At:&nbsp;</span>{{showDate}}</p>
            <p><span>Rating:&nbsp;</span><span class="review-stars">{{showRating}}</span></p>
            <p><span>Review:&nbsp;</span>{{review.txt}}</p>
        </li>
    `,
    computed: {
        showReviewer() {
            return (this.review.name) ? this.review.name : 'Anonymous Reviewer';
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