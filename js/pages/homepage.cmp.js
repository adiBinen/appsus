import mainHeader from '../cmps/main-header.cmp.js';

export default {
    props: ['unreadEmails'],
    components: { mainHeader },
    template: ` 
        <main class="homepage">
            <main-header :unread-emails="unreadEmails"></main-header>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil laboriosam excepturi molestias quae atque nesciunt eveniet ad illo ipsa, harum, dicta quia eius, quo libero impedit rerum distinctio non qui.
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil laboriosam excepturi molestias quae atque nesciunt eveniet ad illo ipsa, harum, dicta quia eius, quo libero impedit rerum distinctio non qui.
            </p>
        </main class="homepage">
    `,

}