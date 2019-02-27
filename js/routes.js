// MAIN PAGES
import homepage from './pages/homepage.cmp.js';

// EMAIL APP PAGES AND CMPS
import emailApp from './apps/email/pages/email-app.cmp.js';
import emailList from './apps/email/cmps/email-list.cmp.js';
import emailDisplay from './apps/email/cmps/email-display.cmp.js';

const routes = [
    { path: '/', component: homepage },
    { path: '/email', component: emailApp,
        children: [
            {path: '', component: emailList},
            {path: 'inbox', component: emailList},
            {path: 'display:emailId', component: emailDisplay}
        ], },
]

export default routes;