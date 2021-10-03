Vue.component('InventoryList', {
    data: function(){
        return {
            uid: Math.floor(Math.random() * 10e16),
        }
    },

    props: {
        name: {
            type: String,
        },
        items: {
            type: Array,
            required: true,
        },
    },
    template: `
<div class="my-current-inventory">
                <h3>{{name}}</h3>
                <b-list-group>
                <b-list-group-item variant="dark">

            <b-row class="columnHeaders">
                <b-col cols="2"></b-col>
                <b-col cols="3">
                    Name
                </b-col>
                <b-col cols="2">
                    Category
                </b-col>
                <b-col cols="4">
                    Description
                </b-col>
                <b-col cols="1">
                    Qty
                </b-col>
            </b-row>
                </b-list-group-item>
            </b-list-group>
                <b-list-group>
                    <list-item v-for="(item, i) in items" 
                    :item="item"
                    :id="item.itemId"
                    :key="item.itemId">
                    </list-item>

                </b-list-group>                                              
            </div>`,
});
Vue.component('ListItem', {


    props: {
        id: {
            type: String | Number
        },
        item: {
            type: Object,
            required: true,
        },
    },
    methods: {
        // popModal(){
        //
        //     console.log(this.item);
        //
        //     // this.testName = this.item.name;
        //
        //
        //     $('#itemNameLabel').val(this.item.name);
        //     $('#itemQty').val(this.item.qty);
        //     $('#itemDescLabel').val(this.item.description);
        //     $('#itemCategory').val(this.item.category);
        // },


        deleteRecord(){
            app.inventory.splice(app.inventory.indexOf(this.item), 1);
        },

    },

    template: `            
            <b-list-group-item variant="dark">           
            <b-row>           
            <b-col cols="2">                        
                <b-button variant="success" v-b-modal="id">
                    <i class="far fa-edit"></i>
                </b-button>
                <my-modal :item="item" :id="id"></my-modal>
                <b-button variant="danger" @click="deleteRecord" type="button" >
                    <i class="fas fa-trash-alt"></i>
                </b-button>
                
            </b-col>
            <b-col  cols="3">
                {{ item.name }}
            </b-col>
            <b-col cols="2">
            {{ item.category }}
            </b-col>
            <b-col cols="4">
            {{ item.description }}
            </b-col>
            <b-col cols="1">
            {{ item.qty }}
            </b-col>
            
            <hr>
            </b-row>
            </b-list-group-item>`
})

Vue.component('MyModal', {

    props: {
        id: {
            type: String | Number
        },

        item :{
            type: Object,
            required: true,
        }
    },
    methods: {
        applyTo(){
            console.log(this.item);
            this.item.name = $('#itemNameLabel').val();
            this.item.qty = $('#itemQty').val();
            this.item.description = $('#itemDescLabel').val();
            this.item.category = $('#itemCategory').val();

            console.log(app.inventory);
            this.hideModal();
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
    },

    template: `<b-modal ref="my-modal" hide-footer :id="id">
                   <b-form>                       
                            <label for="itemNameLabel">Name</label>
                            <b-form-textarea
                                id="itemNameLabel"
                                :value="item.name"
                            ></b-form-textarea>
                            <label for="itemQty">Qty</label>
                            <b-form-textarea
                                id="itemQty"
                                :value="item.qty"
                            ></b-form-textarea>
                            <label for="itemDescLabel">Description</label>
                            <b-form-textarea
                                id="itemDescLabel"
                                :value="item.description"
                            ></b-form-textarea>
                            <label for="itemCategory">Category</label>
                            <b-form-textarea
                                id="itemCategory"
                                :value="item.category"
                            ></b-form-textarea>                          
                    <div class="modal-footer">
                        <b-button  variant="outline-danger" block @click="hideModal">Close Me</b-button>
                        <b-button variant="success" type="button" block @click="applyTo" data-dismiss="modal">Apply</b-button>
                    </div>
                
            </b-form>
        
    </b-modal>`
}),


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
                <b-list-group  class="list-group list-group-flush">
                    <search-list-item v-for="(item, i) in items" 
                    :item="item" 
                    :key="item.name"
                    @remove-item="$emit('remove-item', item)"
                    ></search-list-item>
                </b-list-group>
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
<b-list-group-item variant="dark">
            <b-row>
            <b-col cols="3">
                {{ item.name }}
            </b-col>
            <b-col cols="3">
            {{ item.category }}
            </b-col>
            <b-col cols="4">
            {{ item.description }}
            </b-col>
            <b-col cols="2">
            {{ item.qty }}
            </b-col>
            
            <hr>
            </b-row>
</b-list-group-item>`
});

Vue.component('EnterInfo', {
    data: function () {
        return {
            newEntry: {
                itemId: '0',
                name: '',
                description: '',
                qty: 1,
                category: '',
            },
        }
    },
    props: {


        items: {
            type: Array,
            required: true,
        },
    },
    methods: {
        addIt: function (e) {
            this.newEntry.itemId = (Math.floor(Math.random() * 10e16)) + '';
            console.log(this.newEntry.itemId);
            this.items.push(this.newEntry);

            this.newEntry = {
                itemId: '0',
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





