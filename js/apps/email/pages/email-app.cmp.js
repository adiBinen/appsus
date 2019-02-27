
import mainHeader from '../cmps/header.cmp.js';
import emailList from '../cmps/email-list.cmp.js';
import sideNav from '../cmps/side-nav.cmp.js';

export default {
    components: { mainHeader, sideNav, emailList},
    template: `
        <main class="email-app grid">
            <main-header></main-header>
            <side-nav></side-nav>
            <router-view  class="email-content"></router-view>
        </main>
    `,
    data() {
        return {
            emails: null,
        };
    },
    
    
}