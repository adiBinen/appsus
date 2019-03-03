import mainHeader from '../cmps/main-header.cmp.js';

export default {
    props: ['unreadEmails'],
    components: { mainHeader },
    template: ` 
        <main class="homepage">
            <main-header :unread-emails="unreadEmails"></main-header>
            <div class="homepage-container">            
                    <h1 class="our-app">About Us</h1>
                    <p>
                        We are too 
                    </p>
                </div>
                <div class="icon">
                    <i class="fab fa-vuejs"></i>
                </div>
            </div>
        </main class="homepage">
    `,

}