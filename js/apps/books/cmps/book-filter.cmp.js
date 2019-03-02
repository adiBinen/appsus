export default {
    template: `
            <section class="book-filter flex">
                <button @click="toggleFilter" class="btn btn-filter-toggle">
                    Filter:&nbsp;
                    <span v-if="isToggled"><i class="fas fa-toggle-on"></i></span>
                    <span v-else="!isToggled"><i class="fas fa-toggle-off"></i></span>
                </button>
                <transition name="list" mode="in-out">
                    <form @submit.prevent="filterBooks" class="form-filter flex" v-if="isToggled">
                        <input ref="inputTitle" autofocus class="input-title" type="text" v-model="filterBy.title" 
                            placeholder="Enter Book Title" autofocus 
                        />
                        <div class="flex column">
                            <div>Min Price: {{getMinPrice}}</div>
                            <input class="input-price" type="range" v-model="filterBy.minPrice" value="0" min="0" max="1000"/>
                            <div>Max Price: {{getMaxPrice}}</div>
                            <input class="input-price" type="range" v-model="filterBy.maxPrice" value="0" min="0" max="5000"/>
                        </div>
                        <button 
                            class="btn btn-filter" type="submit" title="Filter Books"
                        >
                            <i class="fas fa-filter"></i>
                        </button>
                    </form>
                </transition>
            </section>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                minPrice: 0,
                maxPrice: 0,
            },
            isToggled: false,
        }
    },
    methods: {
        toggleFilter() {
            this.isToggled = !this.isToggled;
        },
        filterBooks() {
            this.$emit('filter' ,{...this.filterBy})
        }
    },
    computed: {
        getMinPrice() {
            return this.filterBy.minPrice;
        },
        getMaxPrice() {
            return this.filterBy.maxPrice;
        }
        
    }

}