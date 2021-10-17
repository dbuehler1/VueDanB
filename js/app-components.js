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
                <b-button v-b-modal="id + 'i'">
                    <i class="fas fa-info"></i>
                </b-button>
                <info-modal :item="item" :id="id + 'i'"></info-modal>
                
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
    data: function () {
        return {
            applyEntry: {
                itemId: this.item.itemId,
                name: this.item.name,
                description: this.item.description,
                qty: this.item.qty,
                category: this.item.category,
                OS: this.item.OS,
                hardDrive: this.item.hardDrive,
                ram: this.item.ram,
                processor: this.item.processor,
                diskSpace: this.item.diskSpace,
                maxFrames: this.item.maxFrames,
            },
        }
    },

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
            this.item.name = this.applyEntry.name;
            this.item.qty = this.applyEntry.qty;
            this.item.description = this.applyEntry.description;
            if(this.item.category === 'Phone'){
                this.item.OS = this.applyEntry.OS;
            }
            else if(this.item.category === 'Computer'){
                this.item.hardDrive = this.applyEntry.hardDrive;
                this.item.ram = this.applyEntry.ram;
                this.item.processor = this.applyEntry.processor;
            }
            else if(this.item.category === 'Console'){
                this.item.diskSpace = this.applyEntry.diskSpace;
                this.item.maxFrames = this.applyEntry.maxFrames;
            }

            console.log(app.inventory);
            this.hideModal();
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
    },

    template: `<b-modal ref="my-modal" hide-footer :id="id">
                   <b-form>
                        <b-form-group>
                            <label>Name</label>
                            <b-form-textarea
                                  v-model="applyEntry.name"
                            ></b-form-textarea>
                            <label>Qty</label>
                            <b-form-textarea
                                 v-model="applyEntry.qty"
                            ></b-form-textarea>
                            <label>Description</label>
                            <b-form-textarea
                                 v-model="applyEntry.description"
                            ></b-form-textarea>              
                        </b-form-group>
                        <b-form-group v-if="this.item.category === 'Phone'">
                            <label>Operating System</label>
                            <b-form-textarea
                                  v-model="applyEntry.OS"
                            ></b-form-textarea>
                        </b-form-group>   
                        <b-form-group v-if="this.item.category === 'Computer'">
                            <label>Hard Drive</label>
                            <b-form-textarea
                                  v-model="applyEntry.hardDrive"
                            ></b-form-textarea>
                            <label>Ram</label>
                            <b-form-textarea
                                 v-model="applyEntry.ram"
                            ></b-form-textarea>
                            <label>Processor</label>
                            <b-form-textarea
                                 v-model="applyEntry.processor"
                            ></b-form-textarea>
                        </b-form-group>   
                        <b-form-group v-if="this.item.category === 'Console'">
                            <label>Disk Space</label>
                            <b-form-textarea
                                  v-model="applyEntry.diskSpace"
                            ></b-form-textarea>
                            <label>Maximum Frames</label>
                            <b-form-textarea
                                 v-model="applyEntry.maxFrames"
                            ></b-form-textarea>
                        </b-form-group>                          
<!--                            <label for="itemCategory">Category</label>-->
<!--                            <b-form-textarea-->
<!--                                 v-model="applyEntry.category"-->
<!--                            ></b-form-textarea>                          -->

                    <div class="modal-footer">
                        <b-button  variant="outline-danger" block @click="hideModal">Close</b-button>
                        <b-button variant="outline-success" block @click="applyTo" data-dismiss="modal">Apply</b-button>
                    </div>
                
            </b-form>
        
    </b-modal>`
}),
    Vue.component('InfoModal', {
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
            hideModal() {
                console.log(this.item.itemId);
                this.$refs['info-modal'].hide();
            },
        },

        template: `<b-modal ref="info-modal" hide-footer :id="id">
                   <b-form class="viewItemInfo">
                        <b-form-group>
                            <label>Name</label><br>
                            <span>{{this.item.name}}</span><br><br>
                            <label>Category</label><br>
                            <span>{{this.item.category}}</span><br><br>                       
                            <label>Qty</label><br>
                            <span>{{this.item.qty}}</span><br><br>
                            <label>Description</label><br>
                            <span>{{this.item.description}}</span><br>           
                        </b-form-group>
                        <b-form-group v-if="this.item.category === 'Phone'">
                            <label>Operating System</label><br>
                            <span>{{this.item.OS}}</span><br><br>
                        </b-form-group>   
                        <b-form-group v-if="this.item.category === 'Computer'">
                            <label>Hard Drive</label><br>
                            <span>{{this.item.hardDrive}}</span><br><br>
                            <label>Ram</label><br>
                            <span>{{this.item.ram}}</span><br><br>
                            <label>Processor</label><br>
                            <span>{{this.item.processor}}</span><br><br>
                        </b-form-group>   
                        <b-form-group v-if="this.item.category === 'Console'">
                            <label>Disk Space</label><br>
                            <span>{{this.item.diskSpace}}</span><br><br>
                            <label>Maximum Frames</label><br>
                            <span>{{this.item.maxFrames}}</span><br><br>
                        </b-form-group>                          


                    <div class="modal-footer">
                        <b-button  variant="outline-danger" block @click="hideModal">Close</b-button>
                    </div>
                
            </b-form>
        
    </b-modal>`
    }),

Vue.component('EnterInfo', {
    data: function () {
        return {
            newEntry: {
                itemId: '0',
                name: '',
                description: '',
                qty: 1,
                category: '',
                OS: '',
                minutes: '',
                hardDrive: '',
                ram: '',
                processor: '',
                diskSpace: '',
                maxFrames: 0,
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


            if(this.newEntry.category.toLowerCase() === 'phone'){
                this.items.push(new Phone(this.newEntry.name,
                    this.newEntry.qty,this.newEntry.category,
                    this.newEntry.description, this.newEntry.OS));
            }
            else if(this.newEntry.category.toLowerCase() === 'computer'){
                this.items.push(new Computer(this.newEntry.name,
                    this.newEntry.qty,this.newEntry.category,
                    this.newEntry.description, this.newEntry.hardDrive,
                    this.newEntry.ram, this.newEntry.processor));
            }
            else if(this.newEntry.category.toLowerCase() === 'console'){
                this.items.push(new Console(this.newEntry.name,
                    this.newEntry.qty,this.newEntry.category,
                    this.newEntry.description, this.newEntry.diskSpace,
                    this.newEntry.maxFrames));
            }

            this.newEntry = {

                name: '',
                description: '',
                qty: 1,
                category: '',
                OS: '',
                minutes: '',
                hardDrive: '',
                ram: '',
                processor: '',
                diskSpace: '',
                maxFrames: 0,
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
                        <label for="category">Category</label>
                        <select id="category" type="text" class="form-control" v-model="newEntry.category">
                        <option>Phone</option>
                        <option>Computer</option>
                        <option>Console</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="desc">Description</label>
                        <input id="desc" type="text" class="form-control" v-model="newEntry.description">
                    </div>
                    <div class="form-group">
                        <label for="qty">Quantity</label>
                        <input id="qty" type="number" class="form-control" size="3" v-model="newEntry.qty">
                    </div>
                    
                
                
                <div id="phoneInfo" v-if="newEntry.category === 'Phone'">
                    <div class="form-group">
                        <label for="OS">OS</label>
                        <input id="OS" type="text" class="form-control" size="3" v-model="newEntry.OS">
                    </div>
                </div>
                
                <div id="computerInfo"v-if="newEntry.category === 'Computer'">
                    <div class="form-group">
                        <label for="hardDrive">Hard Drive Space</label>
                        <input id="hardDrive" type="text" class="form-control" size="3" v-model="newEntry.hardDrive">
                    </div>
                    <div class="form-group">
                        <label for="ram">Ram</label>
                        <input id="ram" type="text" class="form-control" size="3" v-model="newEntry.ram">
                    </div>
                    <div class="form-group">
                        <label for="processor">Processor</label>
                        <input id="processor" type="text" class="form-control" size="3" v-model="newEntry.processor">
                    </div>
                </div>
                
                <div id="consoleInfo" v-if="newEntry.category === 'Console'">
                    <div class="form-group">
                        <label for="diskSpace">Console Disk Space</label>
                        <input id="diskSpace" type="text" class="form-control" size="3" v-model="newEntry.diskSpace">
                    </div>
                    <div class="form-group">
                        <label for="maxFrames">Maximum Possible Frames</label>
                        <input id="maxFrames" type="text" class="form-control" size="3" v-model="newEntry.maxFrames">
                    </div>
                </div>
                </div>   
                <br>
                <b-button variant="success" id="addContent" @click="addIt">Add +</b-button><br><br>
                    <span id="addItemError"></span>

            </form>`
});

Vue.component('SearchBar', {
    data: function () {
        return {
            typeCheck: this.check + '',
            searchValue: '',
            itemList: this.displayList,
        }
    },
    props: {
        check: {
            type: Text,
        },
        displayList: {
            type: Array,
        }
    },
    methods: {
        search() {
            app.inventory = this.itemList.filter(this.checkResults);
            console.log(this.displayList);
        },
        checkResults(item) {
            if (this.typeCheck === '1') {
                return item.name.toLowerCase().includes(this.searchValue.toLowerCase());
            } else if (this.typeCheck === '2') {
                return item.description.toLowerCase().includes(this.searchValue.toLowerCase());
            } else if (this.typeCheck === '3') {
                return item.category.toLowerCase().includes(this.searchValue.toLowerCase());
            } else {
                return item.name.includes('');
            }
        },
    },

    template: `            
            <b-navbar id="titleBar" toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#"><h3>Inventory Manager</h3></b-navbar-brand>

        <b-collapse id="nav-collapse" is-nav>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-form>
                    <div>
                        <select id="searchBy" class="custom-select" v-model="typeCheck" aria-label="Default select example">
                            <option selected>Search by</option>
                            <option value="1">Name</option>
                            <option value="2">Description</option>
                            <option value="3">Category</option>
                        </select>
                    </div>

                    <b-form-input id="searchBox" size="m" v-model="searchValue" class="mr-sm-2 p-3" placeholder="Search"></b-form-input>
                    <b-button size="m" class="my-2 my-sm-0" type="button" @click="search">Search</b-button>
                </b-nav-form>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>`
})




