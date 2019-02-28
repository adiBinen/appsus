
import utilService from '../../../services/util.service.js';

export default {
    props: ['noteColor'],
    template: `
        <section class="palette-btns" v-if="noteColor">
                <button 
                    class="btn-color"
                    v-for="color in palettes"
                    @click.stop="colorChanged(color)"
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
            this.$emit('colorChanged', color);
        },
    },
    created() {
        this.palettes = utilService.getPastelPalette();
    },
}