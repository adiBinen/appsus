import routes from './routes.js';
import homepage from './pages/homepage.cmp.js';

const router = new VueRouter({ routes })

window.vueApp = new Vue({
    el: '#app',
    router,
    components: {
        homepage
    },
    created() {
    }
})