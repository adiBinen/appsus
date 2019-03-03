// MAIN PAGES
import homepage from './pages/homepage.cmp.js';

// EMAIL APP
import emailApp from './apps/email/pages/email-app.cmp.js';
import emailList from './apps/email/cmps/email-list.cmp.js';
import emailDisplay from './apps/email/cmps/email-display.cmp.js';

// NOTES APP
import notesApp from './apps/notes/pages/notes-app.cmp.js';

// BOOKS APP
import booksApp from './apps/books/pages/book-app.cmp.js';
import bookDetails from './apps/books/pages/book-details.cmp.js'
import bookAdd from './apps/books/pages/book-add.cmp.js';
import bookList from './apps/books/cmps/book-list.cmp.js';

const routes = [
    { path: '/', component: homepage },

    {
        path: '/email:compose?', component: emailApp,
        children: [
            { path: '', component: emailList },
            { path: 'inbox', component: emailList },
            { path: ':emailId', component: emailDisplay },
            { path: '#/:filterBy', component: emailList },
            { path: '#search/:term', component: emailList },
        ],
    },
    { path: '', component: emailApp },
    {
        path: '/notes', component: notesApp,
        children: [
            { path: '#search/:term', component: notesApp }
        ]
    },
    {
        path: '/books', component: booksApp,
        children: [
            { path: '', component: bookList },
            { path: ':bookId/:bookTitle?', component: bookDetails },
            { path: 'book-add', component: bookAdd },

        ]
    },
]

export default routes;