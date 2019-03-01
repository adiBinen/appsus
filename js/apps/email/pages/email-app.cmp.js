// GLOBAL CMPS
import userMsg from '../../../cmps/user-msg-global.cmp.js';

// LOCAL CMPS
import mainHeader from '../cmps/header.cmp.js';
import emailList from '../cmps/email-list.cmp.js';
import sideNav from '../cmps/side-nav.cmp.js';
import emailCompose from '../cmps/email-comopse.cmp.js';
import emailService from '../services/email.service.js';

// EVENT BUS
import {
    eventBus,
    EMAIL_MODIFIED,
    EMAILS_CHECKED_MODIFIED,
    UNREAD_EMAILS,
    USER_MSG_SUCCESS,
    EMAIL_DRAFT_COMPOSING
} from '../../../event-bus.js';


export default {
    props: ['unreadEmails'],
    components: {
        mainHeader,
        sideNav,
        emailList,
        emailCompose,
        userMsg,
    },
    template: `
        <main class="email-app grid">
            <main-header :unread-emails="unreadEmails"></main-header>
            <side-nav :unread-emails="unreadEmails" @openComposeEmail="openComposeEmail()"></side-nav>
            <transition name="fade" mode="out-in">
                <router-view class="email-content"></router-view>
            </transition>
            <email-compose 
                v-if="isComposing"
                @closeComposeEmail="closeComposeEmail" 
                @email-sent="emailSent"
                :username="username" 
                :body="sentBody" 
                :draft-email="draftEmail">
            </email-compose>
            <user-msg></user-msg>
        </main>
    `,
    data() {
        return {
            username: 'adi',
            emails: null,
            isComposing: null,
            sentBody: null,
            draftEmail: null
        };
    },
    methods: {
        emailSent() {
            this.isComposing = false;
            this.sentBody = null;
            this.draftEmail = null;
        },
        openComposeEmail() {
            this.isComposing = true;
        },
        closeComposeEmail(emailDraftToSave) {
            if (emailDraftToSave && !emailDraftToSave.id) {
                emailService.saveEmailToDraft(emailDraftToSave)
                    .then((msg) => {
                        eventBus.$emit(USER_MSG_SUCCESS, msg);
                    })
                this.isComposing = false;
                this.sentBody = null;
                this.draftEmail = null;
                return;
            }
            console.log('im hereeee');

            emailService.modifyEmail(emailDraftToSave)
                .then((msg) => {
                    eventBus.$emit(USER_MSG_SUCCESS, msg);
                    this.isComposing = false;
                    this.sentBody = null;
                    this.draftEmail = null;
                })

        }
    },
    watch: {
        // $route(to, from) {
        //     console.log(to, from); // emails/$#$#$/?compose=CONTENT
        // }
    },
    created() {
        let { compose, body } = this.$route.query;
        this.isComposing = compose;
        this.sentBody = body;

        eventBus.$on(EMAIL_MODIFIED, newEmail => {
            emailService.modifyEmail(newEmail);
        })

        eventBus.$on(EMAILS_CHECKED_MODIFIED, action => {
            emailService.modifyChecked(action)
                .then(() => {
                    eventBus.$emit(UNREAD_EMAILS);
                })
        })

        eventBus.$on(EMAIL_DRAFT_COMPOSING, draftEmail => {
            this.draftEmail = draftEmail;
            this.openComposeEmail();
        });
    }
}