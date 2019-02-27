// Item to display
// Todo: note-type: video, audio, note, todo

import typeNote from './type-note.cmp.js';
import typeVideo from './type-video.cmp.js';
import typeAudio from './type-audio.cmp.js';
import {eventBus, NOTE_DELETE, NOTE_DUPLICATE} from '../../../event-bus.js';

export default {
    components: { typeNote, typeVideo, typeAudio },
    props: ['note'],
    template: `
        <li class="note-item" v-if="note.type !== 'typeTodo'">
            <h1>I AM A NOTE ITEM OF TYPE: {{note.type}}</h1>
            <component :is="note.type" :data="note.data"></component>

            <div class="btn-note-container">
                <button class="btn btn-delete-note" @click="deleteNote()">
                    <i class="fas fa-trash-alt"></i>
                </button>
                <button class="btn btn-copy-note" @click="copyNote()">
                    <i class="fas fa-clone"></i>
                </button>
                <button class="btn btn-color-note">
                    <i class="fas fa-palette"></i>
                </button>
                <button class="btn btn-pin-note">
                    <i class="fas fa-thumbtack"></i>
                </button>
            </div>

        </li>
    `,
    data() {
        return {
        };
    },
    methods: {
        deleteNote() {
            let toDelete = confirm('are you sure you want to delete?');
            if (toDelete) eventBus.$emit(NOTE_DELETE, this.note.id);
        },
        copyNote() {
            eventBus.$emit(NOTE_DUPLICATE, this.note.id);
        }
    }
    
}