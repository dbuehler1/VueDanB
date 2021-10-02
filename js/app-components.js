Vue.component('InventoryList', {

    props: {
        name: {
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
                    :name="item.name" 
                    :key="item.name"
                    ></list-item>
                </ul>
            </div>`,
});
Vue.component('ListItem', {
    data: function () {
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
        popModal(){
            console.log(this.item);

            // this.testName = this.item.name;

            $('#itemNameLabel').val(this.item.name);
            $('#itemQty').val(this.item.qty);
            $('#itemDescLabel').val(this.item.description);
            $('#itemCategory').val(this.item.category);
        },

        applyTo(){
            console.log(this.item);

            app.inventory.indexOf(this.item).name = $('#itemNameLabel').val();
            // this.item.name = $('#itemNameLabel').val();
            this.item.qty = $('#itemQty').val();
            this.item.description = $('#itemDescLabel').val();
            this.item.category = $('#itemCategory').val();
        },
        deleteRecord(){
            app.inventory.splice(app.inventory.indexOf(this.item), 1);
        },
    },

    template: `            
            <div class="itemsTable row">
            <div class="modal fade" id="changeItemModal" tabindex="-1" role="dialog" aria-labelledby="editItemModal" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <form>
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editItemModal">Edit Item</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <label for="itemNameLabel">Item Name</label>
                        <input id="itemNameLabel" type="text" class="form-control">
                        

                        <label for="itemQty">Item Qty</label>
                        <input id="itemQty" type="text" class="form-control">

                        <label for="itemDescLabel">Item Description</label>
                        <input id="itemDescLabel" type="text" class="form-control">

                        <label for="itemCategory">Item Category</label>
                        <input id="itemCategory" type="text" class="form-control">

                    </div>
                    <div class="modal-footer">
                        <b-button variant="danger" type="button" data-dismiss="modal">Close</b-button>
                        <b-button variant="success" type="button" @click="applyTo" data-dismiss="modal">Apply</b-button>
                    </div>
                </div>
            </form>
        </div>
    </div>
            <div class="col-2">
                <b-button variant="success" type="button" data-toggle="modal" @click="popModal" data-target="#changeItemModal" title="Add Item">
                    <i class="far fa-edit"></i>
                </b-button>
                <b-button variant="danger" @click="deleteRecord" type="button" >
                    <i class="fas fa-trash-alt"></i>
                </b-button>
                
            </div>
            <div class="col-3">
                {{ item.name }}
            </div>
            <div class="col-2">
            {{ item.category }}
            </div>
            <div class="col-4">
            {{ item.description }}
            </div>
            <div class="col-1">
            {{ item.qty }}
            </div>
            
            <hr>
            </div>`
})
Vue.component('SearchList', {

    props: {
        name: {
            type: String,
        },
        items: {
            type: Array,
            required: true,
        },
    },
    template: `<div class="my-search-inventory">
                <h3>{{name}}</h3>
                <ul  class="list-group list-group-flush">
                    <search-list-item v-for="(item, i) in items" 
                    :item="item" 
                    :key="item.name"
                    @remove-item="$emit('remove-item', item)"
                    ></search-list-item>
                </ul>
            </div>`,
});
Vue.component('SearchListItem', {
    data: function () {
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
    methods: {},

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

Vue.component('EnterInfo', {
    props: {
        newEntry: {
            name: '',
            description: '',
            qty: 1,
            category: '',
        },

        items: {
            type: Array,
            required: true,
        },
    },
    methods: {
        addIt: function (e) {
            this.items.push(this.newEntry);

            this.newEntry = {
                name: '',
                description: '',
                qty: 1,
                category: '',
            };
        },
    },

    template: `<form>
                <div class="enterItems">
                    <div class="form-group">
                        <label for="name">Item Name</label>
                        <input id="name"  type="text" class="form-control" v-model="newEntry.name" >
                    </div>
                    <div class="form-group">
                        <label for="qty">Quantity</label>
                        <input id="qty" type="number" class="form-control" size="3" v-model="newEntry.qty">
                    </div>
                    <div class="form-group">
                        <label for="desc">Description</label>
                        <input id="desc" type="text" class="form-control" v-model="newEntry.description">
                    </div>
                    <div class="form-group">
                        <label for="category">Category</label>
                        <input id="category" type="text" class="form-control" v-model="newEntry.category">
                    </div>
                </div>
                <br>
                <b-button variant="success" id="addContent" @click="addIt">Add +</b-button><br><br>
                    <span id="addItemError"></span>

            </form>`
});





