
import utilService from '../../../services/util.service.js';

export default {
    props: ['noteColor'],
    template: `
        <section class="palette-btns" v-if="noteColor">
            <button 
                @click=""
                class="btn-color"
                v-for="palette in palettes"
                :style="{'background-color': palette}"
                :class="{selected: noteColor === palette}"
            ></button>
        </section>
    `,
    data() {
        return {
            palettes: [],
        }
    },
    created() {
        this.palettes = utilService.getPastelPalette();
    },

}