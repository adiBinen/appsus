import { eventBus, TO_CONFIRM, NOTE_DELETE_ANS } from '../event-bus.js';

export default {
    template: `
        <aside class="confirm-box" :class="toggleClass">
            <div>{{msg}}</div>
            <div class="confirm-btn-container flex row justify-center">
                <button @click="confirm">Confirm</button>
                <button @click="cancel">Cancel</button>
            </div>
        </aside>
    `,
    data() {
        return {
            msg: '',
            type: null,
        };
    },
    methods: {
        confirm() {
            if (this.type === 'note-confirmation') {
                eventBus.$emit(NOTE_DELETE_ANS, 'ok');
                this.msg = '';
                this.type = null;
            }
        },
        cancel() {
            if (this.type === 'note-confirmation') {
                eventBus.$emit(NOTE_DELETE_ANS, Promise.reject('User refused to delete his precious note.'));
                this.msg = '';
                this.type = null;
            }
        }
    },
    computed: {
        toggleClass() {
            return {show: this.msg};
        }
    },
    created() {
        eventBus.$on(TO_CONFIRM, toConfirm => {
            this.msg = toConfirm.msg;
            this.type = toConfirm.type;
        });
    }
}


// // REFERENCE
// function isDeletingModal() {
//     let elModal = document.querySelector('.modal');
//     elModal.hidden = false;
//     return new Promise((resolve, reject) => {
//         elModal.addEventListener('click', onUserResponse);
//         function onUserResponse(ev) {
//             ev.stopPropagation();
//             if (ev.target.classList[0] === 'btn-yes') resolve();
//             else if (ev.target.classList[0] === 'btn-cancel') reject();
//         }
//     }).then(doClearSearches)
//     .catch(closeModal);
    
    
// }