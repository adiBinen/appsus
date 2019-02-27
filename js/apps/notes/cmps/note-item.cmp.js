// Item to display
// Todo: note-type: video, audio, note, todo

var todoCmp;

import typeNote from './type-note.cmp.js';
import typeVideo from './type-video.cmp.js';
import typeAudio from './type-audio.cmp.js';

export default {
    components: { typeNote, typeVideo, typeAudio, todoCmp },
    props: ['note'],
    template: `
        <li class="note-item" v-if="note.type !== 'typeTodo'">
            <h1>I AM A NOTE ITEM OF TYPE: {{note.type}}</h1>
            <component :is="note.type" :data="note.data"></component>
        </li>
    `,
    data() {
        return {

        };
    },
    
}