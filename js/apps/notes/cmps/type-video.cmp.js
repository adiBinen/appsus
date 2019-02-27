
export default {
    props: ['data'],
    template: `
        <div class="type-video">
            <h1>I hope you chose a good band to play below</h1>
            <input v-model="data">
            <iframe :src="data"></iframe>
        </div>
    `,
}