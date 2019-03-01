// Item to display
// Todo: note-type: video, audio, note, todo

import typeNote from './type-note.cmp.js';
import typeVideo from './type-video.cmp.js';
import typeAudio from './type-audio.cmp.js';
import typeImage from './type-image.cmp.js';
import typeTodo from './type-todo.cmp.js';
import noteToolbar from './note-toolbar.cmp.js';
import { eventBus, NOTE_TODOS_MODIFY, NOTE_UPDATE } from '../../../event-bus.js';
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
                @modify-todos="modifyTodos"
                @update-data="updateData"
            >
            </component>
            <note-toolbar @toggle-edit="toggleEdit" :note="note"></note-toolbar>
        </li>
    `,
    data() {
        return {
            isEditable: false,
            updatedData: this.note.data,
        };
    },
    methods: {
        toggleEdit() {
            this.isEditable = !this.isEditable;
            if (this.note.type !== 'typeTodo') {
                eventBus.$emit(NOTE_UPDATE, {id: this.note.id, data: this.updatedData})
            }
        },
        modifyTodos(todos) {
            eventBus.$emit(NOTE_TODOS_MODIFY, {noteId: this.note.id, todos: todos});
        },
        updateData(data) {
            this.updatedData = data;
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