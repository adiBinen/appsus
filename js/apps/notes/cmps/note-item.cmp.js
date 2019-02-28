// Item to display
// Todo: note-type: video, audio, note, todo

import typeNote from './type-note.cmp.js';
import typeVideo from './type-video.cmp.js';
import typeAudio from './type-audio.cmp.js';
import typeImage from './type-image.cmp.js';
import typeTodo from './type-todo.cmp.js';
import noteToolbar from './note-toolbar.cmp.js';
import notesAppCmp from '../pages/notes-app.cmp.js';
import { eventBus, NOTE_TODO_ADD } from '../../../event-bus.js';
// import paletteBtns from './palette-btns.cmp.js';
// import { eventBus, NOTE_DELETE, NOTE_DUPLICATE } from '../../../event-bus.js';

export default {
    components: { typeNote, typeVideo, typeAudio, typeImage, typeTodo, noteToolbar },
    props: ['note'],
    template: `
        <li class="note-item" :style="noteColor">
            <component 
                :is="note.type" 
                :data="note.data" 
                :is-editable="isEditable"
                @add-todo="addTodo"
            >
            </component>
            <note-toolbar @toggle-edit="toggleEdit" :note="note"></note-toolbar>
        </li>
    `,
    data() {
        return {
            isEditable: false,
        };
    },
    methods: {
        toggleEdit() {
            this.isEditable = !this.isEditable;
        },
        addTodo(todoPointer) {
            let todoToNote = {
                id: this.note.id,
                pointer: todoPointer,
            }
            eventBus.$emit(NOTE_TODO_ADD, todoToNote);
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