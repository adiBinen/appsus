
import paletteBtns from './palette-btns.cmp.js';
import { eventBus,NOTE_DELETE, NOTE_DUPLICATE, NOTE_MODIFIED } from '../../../event-bus.js';


export default {
    components: { paletteBtns },
    props: ['note'],
    template: `
        <section class="btn-note-container">
                <button class="btn btn-delete-note" @click="deleteNote()">
                    <i class="fas fa-trash-alt"></i>
                </button>
                <button class="btn btn-copy-note" @click="duplicateNote()">
                    <i class="fas fa-clone"></i>
                </button>
                
                <button class="btn btn-pin-note" @click="modifyNote('isPinned', 'toggle')">
                    <i class="fas fa-thumbtack"></i>
                </button>

                <!-- Palette button and menu -->
                <button class="btn btn-color-note" @click="isPalleteOpen = !isPalleteOpen">
                    <i class="fas fa-palette"></i>
                </button>
                <div class="color-palette" v-if="isPalleteOpen">
                    <palette-btns 
                        :note-color="note.color"
                        v-if="isPalleteOpen"
                        @colorChanged="modifyNote"
                    ></palette-btns>
                </div>

                <button class="btn btn-edit-note">
                    <i class="fas fa-edit"></i>
                </button>
        </section>
    `,
    data() {
        return {
            isPalleteOpen: false,
            currNote: { ...this.note }
        }
    },
    methods: {
        deleteNote() {
            let toDelete = confirm('are you sure you want to delete?');
            if (toDelete) eventBus.$emit(NOTE_DELETE, this.note.id);
        },
        duplicateNote() {
            eventBus.$emit(NOTE_DUPLICATE, this.note.id);
        },
        modifyNote(prop, val) {
            if (!val && prop.includes('#')) {
                
                val = prop;
                prop = 'color';
            }
            if (val === 'toggle') this.currNote.isPinned = !this.currNote.isPinned;
            else this.currNote[prop] = val;            
            eventBus.$emit(NOTE_MODIFIED, {...this.currNote});
        }
    },
    created() {
    },
}