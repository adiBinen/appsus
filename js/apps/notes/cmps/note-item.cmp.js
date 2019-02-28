// Item to display
// Todo: note-type: video, audio, note, todo

import typeNote from './type-note.cmp.js';
import typeVideo from './type-video.cmp.js';
import typeAudio from './type-audio.cmp.js';
import typeImage from './type-image.cmp.js';
import typeTodo from './type-todo.cmp.js';
import paletteBtns from './palette-btns.cmp.js';
import {eventBus, NOTE_DELETE, NOTE_DUPLICATE} from '../../../event-bus.js';

export default {
    components: { typeNote, typeVideo, typeAudio, typeImage, typeTodo, paletteBtns },
    props: ['note'],
    template: `
        <li class="note-item" :style="noteColor">
            <h1>I AM A NOTE ITEM OF TYPE: {{note.type}}</h1>
            <component :is="note.type" :data="note.data"></component>

            <div class="btn-note-container">
                <button class="btn btn-delete-note" @click="deleteNote()">
                    <i class="fas fa-trash-alt"></i>
                </button>
                <button class="btn btn-copy-note" @click="copyNote()">
                    <i class="fas fa-clone"></i>
                </button>
                <button class="btn btn-color-note" @click="isPalleteOpen = !isPalleteOpen">
                    <i class="fas fa-palette"></i>
                </button>
                <div class="color-palette" v-if="isPalleteOpen">
                    <palette-btns :note-id="note.id" :note-color="note.color"></palette-btns>
                </div>

                <button class="btn btn-pin-note">
                    <i class="fas fa-thumbtack"></i>
                </button>
            </div>
            
        </li>
    `,
    data() {
        return {
            isPalleteOpen: false
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
    },
    computed: {
        noteColor() {
            return {
                'background-color': this.note.color
            }
        }
    }
    
}