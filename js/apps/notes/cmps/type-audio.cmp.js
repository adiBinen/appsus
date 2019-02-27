
export default {
    props: ['data'],
    template: `
        <div class="type-audio">
            <audio controls :src="data"></audio>
        </div>
    `,
}