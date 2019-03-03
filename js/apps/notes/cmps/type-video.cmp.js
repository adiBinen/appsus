
export default {
    props: ['data', 'isEditable'],
    template: `
        <div class="note-type type-video">
            <div class="note-symbol">
                <i class="fab fa-youtube"></i>
            </div>
            <input class="type-edit" v-model="dataCopy" v-show="isEditable">
            <iframe controls :src="url"></iframe>
        </div>
    `,
    data() {
        return {
            dataCopy: this.data,
        };
    },
    computed: {
        url() {
            // SUPPORT YOUTUBE EMBED VIDEOS BY LOOKING FOR ID
            // https://www.youtube.com/embed/YOUTUBEID from https://www.youtube.com/watch?v=IDISHERE
            let idRegex = /v=\w*/;
            let youtubeId = this.data.match(idRegex);
            if (youtubeId && youtubeId[0]) youtubeId = youtubeId[0].substr(2);
            else return this.data;
            let youtubeEmbed = 'https://www.youtube.com/embed/' + youtubeId;
            return youtubeEmbed;
        }
    },

     watch: {
        dataCopy: {
            handler(val) {
                this.$emit('update-data', val);
                
            }
        }
    }
}