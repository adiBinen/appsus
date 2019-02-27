import homepage from './pages/homepage.cmp.js';
import emailApp from './apps/email/pages/email-app.cmp.js';

const routes = [
    { path: '/', component: homepage },
    { path: '/email', component: emailApp },
]

export default routes;