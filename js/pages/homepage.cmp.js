import mainHeader from '../cmps/main-header.cmp.js';

export default {
    props: ['unreadEmails'],
    components: { mainHeader },
    template: ` 
        <main class="homepage">
            <main-header :unread-emails="unreadEmails"></main-header>
            <div class="homepage-container">            
                    <h2 class="title">Welcome,</h2>
                    <div class="vuejs-logo-container">
                        <img class="vuejs-logo" src="./img/vuejs.png" />
                    </div>
                    <p class="welcome-content">
                        Hub is a single web-page application that consists of various web-applications.
                        It was built during our time in CodingAcademy's bootcamp as we were introduced with VueJS for the first time.
                        The code in this project was written exclusively by us, without any usage of external JS/CSS libraries (except for VueJS Framework, and it's extension: Vue-router).
                    </p>
                    <h2 class="title">The Apps</h2>
                    <p>
                        <span>MailsHub:</span>&nbsp;We wanted to create a familiar user-experience with our own tools where users can send and receive e-mails.
                        Although there is no server behind this app 
                        (e-mails that were previously saved as drafts and were sent will only be seen in the sent-inbox, while composed and directly-sent e-mails will be seen in the main-inbox) 
                        it still conveys the same experience.
                        Users can compose e-mails, save drafts, delete, mark as read/unread etc.
                    </p>
                    <p>
                        <span>NotesHub:</span>&nbsp;Users can choose from five types of notes to keep: a text-based note, an image URL, an audio URL, a youtube URL, and a todo-list.
                        The notes' content is editable, as its background color. Users have to select their desired note next to the input field, and afterwards enter a text.
                    </p>
                    <p>
                        <span>BooksHub:</span>&nbsp;This was our first project that was written with VueJS. The goal of integrating it into Hub was to see if it's possible to
                        take an existing stand-alone project and put it into a bigger-scale one. Thanks to the power of VueJS, this task was very simple. The components in Vue needed some minor tweaking,
                        without going to deep, and after a very short time it started to behave as if it was always a part of Hub.
                    </p>
                    <h2 class="title">The Team</h2>
                    <div class="about-card-container flex align-center">
                        <div class="card">
                            <img class="profile-img" src="./img/about/simon.jpg" />
                            <h4>Simon Ron Ifergan</h4>
                            <div class="btns-social-container flex">
                                <a href="https://www.facebook.com/Simon.Ifergan" title="Simon's Facebook profile page" target="_blank">
                                        <i class="fab fa-facebook-square"></i>
                                </a>
                                <a href="https://github.com/simonifergan" title="Simon's Github page" target="_blank">
                                    <i class="fab fa-github-square"></i>
                                </a>
                                <a href="www.linkedin.com/in/simonifergan" title="Simon's Linkedin profile page" target="_blank">
                                    <i class="fab fa-linkedin"></i>
                                </a>
                            </div>
                        </div>
                        <div class="card">
                            <img class="profile-img" src="./img/about/adi.png" />
                            <h4>Adi Binenbaum</h4>
                            <div class="btns-social-container flex">
                                <a href="https://www.facebook.com/adi.binenbaum" title="Adi's Facebook profile page" target="_blank">
                                    <i class="fab fa-facebook-square"></i>
                                </a>
                                <a href="https://github.com/adiBinen" title="Adi's Github page" target="_blank">
                                    <i class="fab fa-github-square"></i>
                                </a>
                                <a href="https://www.linkedin.com/in/adibinenbaum/" title="Adi's Linkedin profile page" target="_blank">
                                    <i class="fab fa-linkedin"></i>
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </main class="homepage">
    `,

}