export default {
    props: ['book'],
    template: `
            <div class="book-preview">
                <div class="book-image-container"
                     :style="getThumbnail"
                >
                    <div class="book-details-container">
                        <h3 class="book-title">{{book.title}}</h3>
                        <p class="book-price">{{getCurrencyChar}}{{book.listPrice.amount}}</p>
                    </div>
                </div>
            </div>
    `,
    computed: {
        getCurrencyChar() {
            let currencyCode = this.book.listPrice.currencyCode;
            if (currencyCode === 'USD') return '$';
            else if (currencyCode === 'EUR') return '€';
            else if (currencyCode === 'ILS') return '₪';
        },
        getThumbnail() {
            return {'background-image': `url('${this.book.thumbnail}')`};
        }
    },
}