
import mainHeader from '../cmps/header.cmp.js';
import emailList from '../cmps/email-list.cmp.js';
import sideNav from '../cmps/side-nav.cmp.js';
import emailCompose from '../cmps/email-comopse.cmp.js'

export default {
    components: { mainHeader,
        sideNav,
        emailList,
        emailCompose
    },
    template: `
        <main class="email-app grid">
            <main-header></main-header>
            <side-nav @openComposeEmail="openComposeEmail()"></side-nav>
            <router-view  class="email-content"></router-view>
            <email-compose v-if="isComposing" @closeComposeEmail="closeComposeEmail" :username="username"></email-compose>
        </main>
    `,
    data() {
        return {
            username: 'adi',
            emails: null,
            isComposing: false
        };
    },
    methods: {
        openComposeEmail() {           
            this.isComposing = true;
        },
        closeComposeEmail() {
            this.isComposing = false;
        }
    }
    
}