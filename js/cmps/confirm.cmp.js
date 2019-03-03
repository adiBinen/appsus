// Can be more dynamic, but works for notes at the moment
import { eventBus, TO_CONFIRM, NOTE_DELETE_ANS } from '../event-bus.js';

export default {
    template: `
        <aside class="confirm-box" :class="toggleClass">
            <div class="confirm-msg">{{msg}}</div>
            <div class="confirm-btn-container flex row justify-center">
                <button class="btn-confirm" title="Confirm" @click="confirm">Confirm</button>
                <button class="btn-cancel" title="Cancel" @click="cancel">Cancel</button>
            </div>
        </aside>
    `,
    data() {
        return {
            msg: '',
            type: null,
            itemId: null,
        };
    },
    methods: {
        confirm() {
            if (this.type === 'note-confirmation') {
                eventBus.$emit(NOTE_DELETE_ANS, Promise.resolve(this.itemId));
                this.msg = '';
                this.type = null;
                this.itemId = null;
            }
        },
        cancel() {
            if (this.type === 'note-confirmation') {
                eventBus.$emit(NOTE_DELETE_ANS, Promise.reject('User refused to delete his precious note.'));
                this.msg = '';
                this.type = null;
                this.itemId = null;
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
            this.itemId = toConfirm.id;
        });

    }
}