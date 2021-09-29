// Vue.use(Vuetify);
const app = new Vue({
    el: "#app",
    data: function () {
        return {
            newItem: {
                name: '',
                description: '',
                qty: 1,
                category: ''
            },
            inventory: [
                {name: 'IPhone', qty: 1, description: ' Mobile Apple Product', category: 'Device'},
                {name: 'Doritos', qty: 10, description: 'Nacho Cheese', category: 'Snacks'},
                {name: 'Laptop', qty: 1, description: 'Windows', category: 'Device'},
                {name: 'Macbook', qty: 2, description: 'MacOS', category: 'Device'},
                {name: 'gift card', qty: 6, description: '$25', category: 'Currency'},
                {name: 'cheetos', qty: 16, description: 'white cheddar', category: 'Snacks'},
                {name: 'Roma Pizza', qty: 15, description: 'Cheese and Sausage', category: 'Meal'},
                {name: 'Hair Clip', qty: 2, description: '4-pack', category: 'Cosmetics'},
                {name: 'Green Sewing Thread', qty: 4, description: 'thin', category: 'Material'},

            ],
            searchinventory: [],
        }
    },
    methods: {
        addIt: function (e) {
            $('#addItemError').text('');
            console.log($('#name').val().length < 1);
            //checking for blank fields
            if (!$('#name').val().length < 1 && !$('#category').val().length < 1 && !$('#qty').val().length < 1 && !$('#desc').val().length < 1) {
                console.log(this)
                var isDuplicate = false;
                //checking for duplicate entries
                this.inventory.forEach(function (item) {
                    if (item.name.toLowerCase() === $('#name').val().toLowerCase()) {
                        isDuplicate = true;
                    }
                })
                console.log(isDuplicate);
                //if duplicate entry is found, no new entry will be pushed
                if (!isDuplicate === true) {
                    //remove potential previous error message
                    $('#addItemError').text('');
                    this.inventory.push(this.newItem);

                    this.newItem = {
                        name: '',
                        description: '',
                        qty: 1,
                        category: '',
                    };
                } else {
                    //provide error details for user
                    $('#addItemError').text('Item with name: \"' + $('#name').val() + '\" already exists');
                }

            }
            else{
                $('#addItemError').text('Please fill out all fields');
            }


        },
        populateModal(){

            var editableRecord = false;
            this.inventory.forEach(function (item) {
                if ($('#nameIdentifier').val().toLowerCase() === item.name.toLowerCase() &&
                    $('#categoryIdentifier').val().toLowerCase() === item.category.toLowerCase()
                ) {
                    $('#itemNameLabel').val(item.name);
                    $('#itemQty').val(item.qty);
                    $('#itemDescLabel').val(item.description);
                    $('#itemCategory').val(item.category);
                    editableRecord = true;
                }
            })

            if (editableRecord === true) {
                $('#deleteItemError').text('');

            } else {
                $('#deleteItemError').text('Record: \"' + $('#nameIdentifier').val() + ', '
                    + $('#categoryIdentifier').val() + '\" could not be found');
            }

        },

        applyChanges(){
            this.inventory.forEach(function (item) {
                if ($('#nameIdentifier').val().toLowerCase() === item.name.toLowerCase() &&
                    $('#categoryIdentifier').val().toLowerCase() === item.category.toLowerCase()
                ) {
                    item.name = $('#itemNameLabel').val();
                    item.qty = $('#itemQty').val();
                    item.description = $('#itemDescLabel').val();
                    item.category = $('#itemCategory').val();

                }
            })
        },

        deleteRecord() {
            var foundRecord = false;
            this.inventory.forEach(function (item) {
                if ($('#nameIdentifier').val().toLowerCase() === item.name.toLowerCase() &&
                    $('#categoryIdentifier').val().toLowerCase() === item.category.toLowerCase()
                ) {
                    app.inventory.splice(app.inventory.indexOf(item), 1);
                    foundRecord = true;
                }
            })

            //removing item from both the search results and normal table
            app.searchinventory.forEach(function (item) {
                if ($('#nameIdentifier').val().toLowerCase() === item.name.toLowerCase() &&
                    $('#categoryIdentifier').val().toLowerCase() === item.category.toLowerCase()
                ) {
                    app.searchinventory.splice(app.searchinventory.indexOf(item), 1);
                    foundRecord = true;
                }
            })

            if (foundRecord === true) {
                $('#deleteItemError').text('');

            } else {
                $('#deleteItemError').text('Record: \"' + $('#nameIdentifier').val() + ', '
                    + $('#categoryIdentifier').val() + '\" could not be found');
            }

        },
        search() {
            $('.searchTableHeader').text('Search Results for: \"' + $('#searchBox').val() + "\"")
            app.searchinventory = [];
            //checking for which option is selected
            if ($('#searchBy option:selected').text().toLowerCase() === 'name') {
                this.inventory.forEach(function (item) {

                    if (item.name.toLowerCase().includes($('#searchBox').val().toLowerCase())) {
                        console.log(item);
                        console.log(app.searchinventory);
                        app.searchinventory.push(item);


                    }
                })
            } else if ($('#searchBy option:selected').text().toLowerCase() === 'description') {
                this.inventory.forEach(function (item) {

                    if (item.description.toLowerCase().includes($('#searchBox').val().toLowerCase())) {
                        console.log(item);
                        console.log(app.searchinventory);
                        app.searchinventory.push(item);


                    }
                })
            } else if ($('#searchBy option:selected').text().toLowerCase() === 'category') {
                this.inventory.forEach(function (item) {

                    if (item.category.toLowerCase().includes($('#searchBox').val().toLowerCase())) {
                        console.log(item);
                        console.log(app.searchinventory);
                        app.searchinventory.push(item);


                    }
                })
            }
            else if ($('#searchBy option:selected').text().toLowerCase() === 'search by'){
                $('.searchTableHeader').text("Please select a \"Search by\" option")
            }
            else {
                //contingency text
                if (app.searchinventory.length === 0) {
                    //contingency text
                    $('.searchTableHeader').text('No Results for: \"' + $('#searchBox').val() + "\"")
                }
            }


        },


    },
    computed: {
        myInventory: function () {
            return this.inventory.filter(function (item) {
                return item;
            });
        },

    },
    // mounted: function() {
    //     if(localStorage.getItem('inventory')){
    //         this.inventory = JSON.parse(localStorage.getItem('inventory'));
    //     }
    // },
    // watch: {
    //     inventory: {
    //         handler: function(newList){
    //             localStorage.setItem('inventory', JSON.stringify(newList));
    //         },
    //         deep: true,
    //     }
    // }
});