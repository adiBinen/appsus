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
    USER_MSG_FAILURE,
    EMAIL_DRAFT_COMPOSING,
    EMAIL_DELETED,
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
            <main-header @toggle-nav="toggleNav" :unread-emails="unreadEmails"></main-header>
            <side-nav :unread-emails="unreadEmails" @openComposeEmail="openComposeEmail()" :class="navToggle"></side-nav>
            <transition name="fade" mode="out-in">
                <router-view class="email-content"></router-view>
            </transition>
            <email-compose 
                v-if="isComposing"
                @closeComposeEmail="closeComposeEmail" 
                @email-sent="sentEmail"
                @discardDraft="discardDraft"
                :username="username" 
                :body="sentBody" 
                :draft-email="draftEmail">
            </email-compose>
            <user-msg></user-msg>
        </main>
    `,
    data() {
        return {
            username: 'Adi B.',
            emails: null,
            isComposing: null,
            sentBody: null,
            draftEmail: null,
            isNavToggled: false,
        };
    },
    methods: {
        sentEmail() {
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

            emailService.modifyEmail(emailDraftToSave)
                .then((msg) => {
                    eventBus.$emit(USER_MSG_SUCCESS, msg);
                    this.isComposing = false;
                    this.sentBody = null;
                    this.draftEmail = null;
                })
        },
        discardDraft(id) {
            this.isComposing = false;
            this.sentBody = null;
            this.draftEmail = null;
            if (id) {
                emailService.deleteEmail(id)
                    .then(msg => eventBus.$emit(USER_MSG_SUCCESS, msg))
                    .catch(msg => eventBus.$emit(USER_MSG_FAILURE, msg))
            } else eventBus.$emit(USER_MSG_SUCCESS, 'Draft was successfully removed.')
        },
        toggleNav() {
            this.isNavToggled = !this.isNavToggled;
        }
    },
    computed: {
        navToggle() {
            return {show: this.isNavToggled};
        }
    },
    mounted() {
        let { compose, body } = this.$route.query;
        this.isComposing = compose;
        this.sentBody = body;

        eventBus.$on(EMAIL_MODIFIED, newEmail => {
            emailService.modifyEmail(newEmail);
        })

        eventBus.$on(EMAILS_CHECKED_MODIFIED, action => {
            emailService.modifyChecked(action)
                .then(msg => {
                    eventBus.$emit(UNREAD_EMAILS);
                    eventBus.$emit(USER_MSG_SUCCESS, msg);
                })
                .catch(msg => eventBus.$emit(USER_MSG_FAILURE, msg));
        })

        eventBus.$on(EMAIL_DRAFT_COMPOSING, draftEmail => {
            this.draftEmail = draftEmail;
            this.openComposeEmail();
        });

        eventBus.$on(EMAIL_DELETED, emailId => {
            emailService.deleteEmail(emailId)
                .then(msg => eventBus.$emit(USER_MSG_SUCCESS, msg))
                .catch(msg => eventBus.$emit(USER_MSG_FAILURE, msg));
        });
    },
    beforeDestroy() {
        eventBus.$off(EMAIL_MODIFIED)

        eventBus.$off(EMAILS_CHECKED_MODIFIED)

        eventBus.$off(EMAIL_DRAFT_COMPOSING);

        eventBus.$off(EMAIL_DELETED);
    }
}