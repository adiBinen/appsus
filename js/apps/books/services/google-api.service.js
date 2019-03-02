const GOOGLE_BOOKS_URL = `https://www.googleapis.com/books/v1/volumes?q=TERM_PLACEHOLDER:keyes&key=AIzaSyBw5-l7YknpN8v8z7Vtzz-K_yw64PfXLyY`;
const GOOGLE_BOOKS_SAMPLE_URL = `https://www.googleapis.com/books/v1/volumes?printType=books&q=TERM_PLACEHOLDER`

export function getGoogleBooks(term) {
    let url = GOOGLE_BOOKS_URL.replace(/TERM_PLACEHOLDER/, term);
    return axios.get(url)
        .then(res => res.data.items);
}