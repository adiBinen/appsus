
import utilService from '../../../services/util.service.js';
import {eventBus, NOTE_CHANGE_COLOR} from '../../../event-bus.js';

export default {
    props: ['noteColor', 'noteId'],
    template: `
        <section class="palette-btns" v-if="noteColor">
            <button 
                class="btn-color"
                v-for="color in palettes"
                @click="colorChanged(color)"
                :style="{'background-color': color}"
                :class="{selected: noteColor === color}"
            ></button>
        </section>
    `,
    data() {
        return {
            palettes: [],
        }
    },
    methods: {
        colorChanged(color) {
            eventBus.$emit(NOTE_CHANGE_COLOR, color);
        }
    },
    created() {
        this.palettes = utilService.getPastelPalette();
    },

}