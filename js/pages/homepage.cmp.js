import mainHeader from '../cmps/main-header.cmp.js';

export default {
    props: ['unreadEmails'],
    components: { mainHeader },
    template: ` 
        <main class="homepage">
            <main-header :unread-emails="unreadEmails"></main-header>
            <div class="homepage-container">            
                    <h1 class="our-app">Our App</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consectetur optio cumque, dignissimos, possimus animi quia totam est voluptatibus quasi fugiat, fuga velit nostrum impedit unde. Vero enim perferendis dolor.
                    </p>
                </div>
                <div class="icon">
                    <i class="fab fa-vuejs"></i>
                </div>
            </div>
        </main class="homepage">
    `,

}