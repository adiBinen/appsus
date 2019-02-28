
export default {
    props: ['data'],
    template: `
        <div class="type-image">
            <input v-model="data">
            <img :src="data" />
        </div>
    `,
}