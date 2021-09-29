Vue.component('List', {

    props: {
        name:{
            type: String,
        },
        items: {
            type: Array,
            required: true,
        },
    },
    template: `<div class="my-current-inventory">
                <h3>{{name}}</h3>
                <ul class="list-group list-group-flush">
                    <list-item v-for="(item, i) in items" 
                    :item="item" 
                    :key="item.name"
                    @remove-item="$emit('remove-item', item)"
                    ></list-item>
                </ul>
            </div>`,
});
Vue.component('ListItem' , {
    data: function(){
        return {
            uid: Math.floor(Math.random() * 10e16),
        }
    },

    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    methods: {

    },

    template: `
            <div class="itemsTable row">
            <div class="col-3">
                {{ item.name }}
            </div>
            <div class="col-3">
            {{ item.category }}
            </div>
            <div class="col-4">
            {{ item.description }}
            </div>
            <div class="col-2">
            {{ item.qty }}
            </div>
            <hr>
            </div>`
})
Vue.component('searchList', {

    props: {
        name:{
            type: String,
        },
        items: {
            type: Array,
            required: true,
        },
    },
    template: `<div class="my-search-inventory">
                <h3>{{name}}</h3>
                <ul class="list-group list-group-flush">
                    <list-item v-for="(item, i) in items" 
                    :item="item" 
                    :key="item.name"
                    @remove-item="$emit('remove-item', item)"
                    ></list-item>
                </ul>
            </div>`,
});
Vue.component('SearchList' , {
    data: function(){
        return {
            uid: Math.floor(Math.random() * 10e16),
        }
    },
    props: {
        item: {
            type: Array,
            required: true,
        },
    },
    methods: {

    },

    template: `
            <div class="itemsTable row">
            <div class="col-3">
                {{ item.name }}
            </div>
            <div class="col-3">
            {{ item.category }}
            </div>
            <div class="col-4">
            {{ item.description }}
            </div>
            <div class="col-2">
            {{ item.qty }}
            </div>
            <hr>
            </div>`
});
